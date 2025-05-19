// [index.tsx] — Complete version with all updates
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const presets = {
  "Goblin Grocery Run": {
    store: "Goblin Mart",
    items: [
      { item: "Toenail File", quantity: 1, price: 3.33 },
      { item: "Glowing Mushrooms", quantity: 5, price: 12.0 }
    ]
  },
  "Ex’s Emotional Invoice": {
    store: "Heartbreak Bank",
    items: [
      { item: "Therapy", quantity: 1, price: 300.0 },
      { item: "Missed Calls", quantity: 10, price: 0.0 },
      { item: "Closure", quantity: 1, price: 0.0 }
    ]
  },
  "Tech Startup Lunch": {
    store: "Silicon Snacks",
    items: [
      { item: "Sushi", quantity: 1, price: 85.0 },
      { item: "MacBook Dongle", quantity: 1, price: 49.0 },
      { item: "VC Tears", quantity: 1, price: 0.99 }
    ]
  },
  "Time Traveler's Tab": {
    store: "Chrono Depot",
    items: [
      { item: "Quantum Flip Flops", quantity: 1, price: 19.99 },
      { item: "Paradox Insurance", quantity: 1, price: 149.99 },
      { item: "Timeline Repair Fee", quantity: 1, price: 1000.0 }
    ]
  },
  "Apocalypse Snack Run": {
    store: "Bunker Foods Unlimited",
    items: [
      { item: "Canned Sunshine", quantity: 6, price: 4.2 },
      { item: "Mutant Nacho Dust", quantity: 3, price: 7.77 },
      { item: "Soylent Red", quantity: 2, price: 12.34 }
    ]
  },
  "AI Burnout Recovery": {
    store: "Neural Recharge Station",
    items: [
      { item: "Meditation.exe", quantity: 1, price: 29.99 },
      { item: "Cry Room Subscription", quantity: 1, price: 15.0 },
      { item: "Synthetic Empathy Serum", quantity: 1, price: 42.0 }
    ]
  },
  "WitchTok Starter Pack": {
    store: "Hex & Co.",
    items: [
      { item: "Moonwater Jar", quantity: 1, price: 8.88 },
      { item: "Crystals (cursed)", quantity: 5, price: 3.33 },
      { item: "Spiritual Wi-Fi Booster", quantity: 1, price: 13.13 }
    ]
  },
  "Rent for My Sims Character": {
    store: "SimLife Landlord Corp.",
    items: [
      { item: "Virtual Rent", quantity: 1, price: 950.0 },
      { item: "Furniture DLC", quantity: 1, price: 120.0 },
      { item: "Sadness Expansion Pack", quantity: 1, price: 49.99 }
    ]
  },
  "Doomscroll Detox Kit": {
    store: "Wellness Wasteland",
    items: [
      { item: "Phone Jail", quantity: 1, price: 11.11 },
      { item: "Blue Light Banisher", quantity: 1, price: 27.0 },
      { item: "Hope (tiny vial)", quantity: 1, price: 0.01 }
    ]
  }
}

const emailBodyOptions = [
  "in the form of glowing mushrooms and emotional labor",
  "in gold doubloons and hugs",
  "in haunted doll parts and regret",
  "in tears and TikTok likes",
  "in expired coupons and cat photos",
  "in emoji reactions and ghosted texts",
  "in tragic backstories and witch curses",
  "in NFTs and poorly timed memes",
  "in emotional damage reimbursements",
  "via a time-traveling courier by 1998",
  "by sacrificing one browser tab"
]

const emailSubjectOptions = [
  "Your Goblin Mart Receipt 🧌",
  "Important Billing Notice 💰",
  "Final Invoice: You Owe Us",
  "Thanks for Shopping at Heartbreak Bank 💔",
  "Your Dungeon Expense Report 🗡️",
  "Chrono Depot - Your Timeline Charges 📆",
  "Receipt: WitchTok Essentials 🧹",
  "SimLife Rent Confirmation 🛋️",
  "Bunker Foods Transaction Complete 💣",
  "Emotional Damage Claim Approved ✅",
  "Neural Recharge Successful ⚡"
]

const senderNameOptions = [
  "Goblin Finance Team",
  "Goblin Greg",
  "Accounts Payable",
  "Cursed Finance Dept.",
  "Your Emotional Support Witch",
  "Rita from IT (She’s Furious)",
  "AI Collections Division 🤖",
  "Paranormal Accounting Team 👻",
  "The Rent Collector (Sims Edition)",
  "Apocalypse Fund Recovery Unit"
]

const generatePDFBlob = async (receiptText: string) => {
  const lines = receiptText.split('\n')
  const lineHeight = 14
  const width = 300
  const height = lines.length * lineHeight + 80

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([width, height])
  const font = await pdfDoc.embedFont(StandardFonts.Courier)
  let y = height - 30

  lines.forEach(line => {
    page.drawText(line, { x: 10, y, size: 10, font, color: rgb(0, 0, 0) })
    y -= lineHeight
  })

  page.drawText('| ||| | || || | ||| || ||| || || ||| || |', {
    x: 10,
    y: 15,
    size: 10,
    font,
    color: rgb(0, 0, 0)
  })

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

export default function Home() {
  const [store, setStore] = useState("")
  const [items, setItems] = useState([{ item: "", quantity: "", price: "" }])
  const [email, setEmail] = useState("")
  const [now, setNow] = useState("")
  const [emailSubject, setEmailSubject] = useState(emailSubjectOptions[0])
  const [senderName, setSenderName] = useState(senderNameOptions[0])
  const [emailBody, setEmailBody] = useState(`Please review the attached receipt and submit your payment ${emailBodyOptions[0]}.`)

  useEffect(() => {
    setNow(new Date().toLocaleString())
  }, [])

  const calculateSubtotal = () =>
    items.reduce((acc, cur) => acc + (parseFloat(cur.price || "0") * parseInt(cur.quantity || "0")), 0)

  const taxRate = 0.1
  const subtotal = calculateSubtotal()
  const tax = subtotal * taxRate
  const total = subtotal + tax

  const handlePreset = (name: string) => {
    const preset = presets[name as keyof typeof presets]
    if (!preset) return
    setStore(preset.store)
    setItems(preset.items.map(i => ({
      item: i.item,
      quantity: i.quantity.toString(),
      price: i.price.toString()
    })))
  }

  const addItem = () => {
    setItems([...items, { item: "", quantity: "", price: "" }])
  }

  const exportPDF = async () => {
    const receiptText = `==============================\n${store}\n${now}\n==============================\n` +
      items.map(i => `${i.item.padEnd(18)}x${i.quantity}  $${(parseFloat(i.price || "0").toFixed(2))}\n`).join('') +
      `------------------------------\nSubtotal                  $${subtotal.toFixed(2)}\n` +
      `Tax (10%)                $${tax.toFixed(2)}\nTotal                     $${total.toFixed(2)}\n` +
      `==============================\n   Thanks for shopping!\n==============================`

    const blob = await generatePDFBlob(receiptText)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'receipt.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const emailReceipt = async () => {
    if (!email) return alert("Enter an email!")

    const receiptText = `==============================\n${store}\n${now}\n==============================\n` +
      items.map(i => `${i.item.padEnd(18)}x${i.quantity}  $${(parseFloat(i.price || "0").toFixed(2))}\n`).join('') +
      `------------------------------\nSubtotal                  $${subtotal.toFixed(2)}\n` +
      `Tax (10%)                $${tax.toFixed(2)}\nTotal                     $${total.toFixed(2)}\n` +
      `==============================\n   Thanks for shopping!\n==============================`

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, receiptText, subject: emailSubject, senderName, emailBody, storeName: store })
    })

    if (res.ok) {
      alert("📧 Receipt sent!")
    } else {
      alert("❌ Failed to send email.")
    }
  }

  return (
    <>
      <Head>
        <title>Receipt Goblin</title>
      </Head>
      <h1>Receipt Goblin</h1>
      <form>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <select onChange={(e) => handlePreset(e.target.value)} defaultValue="">
            <option value="">Choose Example</option>
            {Object.keys(presets).map((name, idx) => (
              <option key={idx} value={name}>{name}</option>
            ))}
          </select>
          <button type="button" onClick={() => {
            const keys = Object.keys(presets)
            const rand = keys[Math.floor(Math.random() * keys.length)]
            handlePreset(rand)
          }}>🎲 Random Receipt</button>
        </div>

        <label>Store Name</label>
        <input type="text" value={store} onChange={e => setStore(e.target.value)} />

        {items.map((item, idx) => (
          <div key={idx}>
            <label>Item</label>
            <input value={item.item} onChange={e => {
              const newItems = [...items]
              newItems[idx].item = e.target.value
              setItems(newItems)
            }} />
            <label>Quantity</label>
            <input type="number" value={item.quantity} onChange={e => {
              const newItems = [...items]
              newItems[idx].quantity = e.target.value
              setItems(newItems)
            }} />
            <label>Price</label>
            <input type="number" value={item.price} onChange={e => {
              const newItems = [...items]
              newItems[idx].price = e.target.value
              setItems(newItems)
            }} />
          </div>
        ))}

        <button type="button" onClick={addItem}>+ Add Item</button>

        <label>Subtotal</label>
        <input type="text" value={subtotal.toFixed(2)} disabled />
        <label>Tax</label>
        <input type="text" value={tax.toFixed(2)} disabled />
        <label>Total</label>
        <input type="text" value={total.toFixed(2)} disabled />

        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />

        <label>Email Subject</label>
        <select value={emailSubject} onChange={e => setEmailSubject(e.target.value)}>
          {emailSubjectOptions.map((subj, i) => (
            <option key={i} value={subj}>{subj}</option>
          ))}
          <option value="__custom_subject__">✍️ Custom</option>
        </select>
        {emailSubject === '__custom_subject__' && (
          <input type="text" placeholder="Enter custom subject" onChange={e => setEmailSubject(e.target.value)} />
        )}

        <label>Sender Name</label>
        <select value={senderName} onChange={e => setSenderName(e.target.value)}>
          {senderNameOptions.map((name, i) => (
            <option key={i} value={name}>{name}</option>
          ))}
          <option value="__custom_sender__">✍️ Custom</option>
        </select>
        {senderName === '__custom_sender__' && (
          <input type="text" placeholder="Enter custom sender name" onChange={e => setSenderName(e.target.value)} />
        )}

        <label>Email Message</label>
        <p>Please review the attached receipt and submit your payment:</p>
        <select value={emailBody} onChange={e => setEmailBody(e.target.value)}>
          {emailBodyOptions.map((opt, i) => (
            <option key={i} value={`Please review the attached receipt and submit your payment ${opt}.`}>
              {opt}
            </option>
          ))}
        </select>
        <p style={{ marginTop: '1rem' }}>Or write your own:</p>
        <input
          type="text"
          placeholder="e.g. in Pokémon cards and voice notes"
          onChange={e => setEmailBody(`Please review the attached receipt and submit your payment ${e.target.value}.`)}
        />

        <button type="button" onClick={emailReceipt}>📧 Email Receipt</button>
      </form>

      <h2>🧾 Preview</h2>
      <div id="receipt-preview" style={{
        background: '#fff',
        color: '#000',
        padding: '1rem',
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        maxWidth: '320px',
        border: '1px dashed #ccc',
        margin: '1rem auto'
      }}>
        {"=".repeat(30) + "\n"}
        {store ? `${store}\n` : ''}
        {now + "\n"}
        {"=".repeat(30) + "\n"}
        {items.map(i => `${i.item.padEnd(18)}x${i.quantity}  $${(parseFloat(i.price || "0").toFixed(2))}\n`).join('')}
        {"-".repeat(30) + "\n"}
        {`Subtotal${" ".repeat(18)}$${subtotal.toFixed(2)}\n`}
        {`Tax (10%)${" ".repeat(17)}$${tax.toFixed(2)}\n`}
        {`Total${" ".repeat(21)}$${total.toFixed(2)}\n`}
        {"=".repeat(30) + "\n"}
        {"   Thanks for shopping!\n"}
        {"=".repeat(30)}
      </div>



      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9137965505112886"
          data-ad-slot="9201119437"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      {/* AdSense Script Loader */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />

      <button type="button" onClick={exportPDF}>📄 Download PDF</button>
    </>
  )
}
