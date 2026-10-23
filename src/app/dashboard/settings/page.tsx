"use client"

import { useState, useEffect } from "react"
import { ArrowRightLeft, DollarSign, RefreshCw, Calculator } from "lucide-react"

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<number>(100)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'BDT', 'AUD', 'CAD', 'SGD', 'JPY', 'CNY', 'AED']

  const fetchRate = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      const data = await res.json()
      setExchangeRate(data.rates[toCurrency])
      setLastUpdated(new Date(data.time_last_update_unix * 1000).toLocaleString())
    } catch (error) {
      console.error("Error fetching rate", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRate()
  }, [fromCurrency, toCurrency])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const convertedAmount = exchangeRate ? (amount * exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6 mt-4">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings & Tools</h1>
          <p className="text-sm text-gray-500">Manage your workspace tools and utility widgets.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center gap-3 bg-gray-50/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Currency Converter</h2>
              <p className="text-sm text-gray-500">Live exchange rates for international clients.</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm font-medium"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex justify-center pb-1">
                <button
                  onClick={handleSwap}
                  className="p-2.5 bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 rounded-full transition-colors shadow-sm"
                  title="Swap currencies"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm font-medium"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-md py-2.5 pl-9 pr-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm font-bold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-blue-600 mb-2">Converted Amount</p>
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                  ) : (
                    <span className="text-4xl font-black text-blue-900 tracking-tight">
                      {convertedAmount} <span className="text-2xl text-blue-700/80 ml-1">{toCurrency}</span>
                    </span>
                  )}
                </div>
                {exchangeRate && !loading && (
                  <p className="text-xs font-semibold text-blue-600/70 mt-3 bg-blue-100/50 inline-block px-3 py-1 rounded-full border border-blue-100">
                    1 {fromCurrency} = {exchangeRate} {toCurrency}
                  </p>
                )}
              </div>
            </div>

          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Last updated: {lastUpdated}
            </span>
            <button 
              onClick={fetchRate}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline px-3 py-1.5 bg-blue-50 rounded-md transition-colors"
            >
              Refresh Rates
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}