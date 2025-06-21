import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (!currencyInfo || !currencyInfo[to]) return
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="w-full max-w-md px-6 py-8 bg-white/30 backdrop-blur-md rounded-lg shadow-lg border border-gray-300">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Currency Converter
          </h1>

          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(val) => setAmount(val)}
            />
          </div>

          <div className="relative w-full flex justify-center my-4">
            <button
              type="button"
              onClick={() => {
                swap()
                convert()
              }}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1 rounded-md text-sm shadow-md"
            >
              Swap
            </button>
          </div>

          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
