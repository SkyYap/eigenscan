"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { IBM_Plex_Mono } from "next/font/google"
import ReactHtmlParser from "react-html-parser"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const ibm = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export default function Home() {
    const [userData, setUserData] = useState()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(25)
    const [totalCount, setTotalCount] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchColumn, setSearchColumn] = useState("event")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [AVSs, setAVSs] = useState(0)
    const [Operators, setOperators] = useState(0)
    const [Stakers, setStakers] = useState(0)
    const [TVL, setTVL] = useState(0)
    const [RegisteredValidatorKey, setRegisteredValidatorKey] = useState(0)

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

    const fetchEvents = async () => {
        setLoading(true)
        let query = supabase
            .from("eigenevents")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })

        if (searchTerm && searchColumn) {
            query = query.ilike(searchColumn, `%${searchTerm}%`)
        }

        const { data, error, count } = await query.range((page - 1) * perPage, page * perPage - 1)

        if (error) {
            console.error("Error fetching events:", error.message)
        } else {
            setEvents(data)
            setTotalCount(Math.min(count, 10000))
        }
        setLoading(false)
    }

    const totalPages = Math.ceil(totalCount / perPage)

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    function formatTxHash(hash) {
        return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
    }

    function formatMessageWithLinks(message) {
        const ethAddressRegex = /([^a-fA-F0-9]|^)(0x[a-fA-F0-9]{40})([^a-fA-F0-9]|$)/g
        const urlRegex = /(https?:\/\/(?!etherscan\.io)[^\s]+)/g

        message = message.replace(ethAddressRegex, (match, p1, p2, p3) => {
            const truncated = `${p2.substring(0, 6)}...${p2.substring(p2.length - 4)}`

            const prefix = /[^a-fA-F0-9]/.test(p1) ? p1 : ""
            const suffix = /[^a-fA-F0-9]/.test(p3) ? p3 : ""
            const link = `<a href="https://etherscan.io/address/${p2}" target="_blank" rel="noopener noreferrer" class="text-blue-300 underline">${truncated}</a>`

            return `${prefix}${link}${suffix}`
        })
        message = message.replace(urlRegex, (url) => {
            url = url.replace(/[.,!?;]*$/, "")
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-300 underline">this</a>`
        })
        return message
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        return date
            .toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "UTC",
            })
            .replace(",", "")
    }

    function shouldDisplayEvent(newEvent) {
        if (!searchTerm) return true
        const searchValue = newEvent[searchColumn]?.toLowerCase()
        return searchValue && searchValue.includes(searchTerm.toLowerCase())
    }

    useEffect(() => {
        const signIn = async () => {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: process.env.NEXT_PUBLIC_EMAIL_ID,
                password: process.env.NEXT_PUBLIC_PASSWORD,
            })
            if (error) {
                setAuthError(error.message)
            } else {
                setUserData(data)
            }
        }

        signIn()
    }, [])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchEvents()
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [searchTerm, page, perPage])

    useEffect(() => {
        const fetchLatestData = async () => {
            const { data, error } = await supabase
                .from("pufferdata")
                .select("*")

            if (error) {
                console.error("Error fetching initial data: ", error)
            } else if (data && data.length > 0) {
                setRegisteredValidatorKey(data[0].number_validators)
                // setAVSs(data[0].number_avs)
                // setOperators(data[0].number_operator)
                // setStakers(data[0].number_staker)
            }
        }

        fetchLatestData()

        const eigendataSubscription = supabase
            .channel("eigendata")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "eigendata" },
                (payload) => {
                    setTVL(payload.new.tvl_eth)
                    setAVSs(payload.new.number_avs)
                    setOperators(payload.new.number_operator)
                    setStakers(payload.new.number_staker)
                },
            )
            .subscribe()

        return () => {}
    }, [])

    useEffect(() => {
        const subscription = supabase
            .channel("eigenevents")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "eigenevents" },
                (payload) => {
                    if (shouldDisplayEvent(payload.new)) {
                        setEvents((currentEvents) =>
                            [payload.new, ...currentEvents].slice(0, perPage),
                        )
                    }
                },
            )
            .subscribe()

        return () => {}
    }, [perPage, searchTerm, searchColumn])

    return (
        <div className="text-white">
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center py-4 px-8">
                {/* Logo at top left */}
                <img src="markDarkA.svg" alt="Icon" className="max-w-12" />
                
                {/* Navigation buttons at top right */}
                <div>
                    <button
                        className="border border-eigen-light-blue bg-eigen-light-blue text-eigen-dark-blue hover:bg-eigen-dark-blue hover:text-eigen-light-blue rounded-md py-2 px-4 text-sm mr-2"
                        onClick={() => {
                            window.location.href = 'http://localhost:3001/puffer';
                        }}
                    >
                        Puffer Event Dashboard
                    </button>
                    <button
                        className="border border-eigen-light-blue bg-eigen-light-blue text-eigen-dark-blue hover:bg-eigen-dark-blue hover:text-eigen-light-blue rounded-md py-2 px-4 text-sm mr-2"
                        onClick={() => {
                            window.location.href = 'http://localhost:3001/puffer-global-avs-metrics';
                        }}
                    >
                        Puffer Global AVS Metrics
                    </button>
                    <button
                        className="border border-eigen-light-blue bg-eigen-light-blue text-eigen-dark-blue hover:bg-eigen-dark-blue hover:text-eigen-light-blue rounded-md py-2 px-4 text-sm mr-2"
                        onClick={() => {
                            window.location.href = 'http://localhost:3001/puffer-host-metrics';
                        }}
                    >
                        Puffer Host Metrics 
                    </button>
                    <button
                        className="border border-eigen-light-blue bg-eigen-light-blue text-eigen-dark-blue hover:bg-eigen-dark-blue hover:text-eigen-light-blue rounded-md py-2 px-4 text-sm mr-2"
                        onClick={() => {
                            window.location.href = 'http://localhost:3001/avs-metrics';
                        }}
                    >
                        AVS Metrics
                    </button>
                    <button
                        className="border border-eigen-light-blue bg-eigen-light-blue text-eigen-dark-blue hover:bg-eigen-dark-blue hover:text-eigen-light-blue rounded-md py-2 px-4 text-sm mr-2"
                        onClick={() => {
                            window.location.href = 'http://localhost:3001/eigenDA-metrics';
                        }}
                    >
                        EigenDA Metrics
                    </button>
                </div>
            </nav>
                            
                {/* Main Content */}
                <iframe
                width="100%"
                height="800px"
                src={`http://localhost:3000/public-dashboards/a20dadad868c45158436912e012bf066`}
                ></iframe>
        </div>
    )
}
