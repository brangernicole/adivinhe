import styles from "./app.module.css"
import { useEffect, useRef, useState } from "react"
import { WORDS, type Challenge } from "./utils/words"

import { Tip } from "./components/Tip"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { Letter } from "./components/Letter"
import { Header } from "./components/Header"
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed"
import { Modal } from "./components/Modal/Modal"

const ATTEMPTS_MARGIN = 5

export default function App() {
  const [score, setScore] = useState(0)
  const [letter, setLetter] = useState("")
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [shake, setShake] = useState(false)
  const [notification, setNotification] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const inputRef = useRef<HTMLInputElement | null>(null)

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)
    setScore(0)
    setLetter("")
    setLettersUsed([])
    setModalOpen(false)
    inputRef.current?.focus()
  }

  function handleRestartGame() {
    const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?")
    if (isConfirmed) {
      startGame()
    }
  }

  function handleConfirm() {
    if (!challenge) return

    if (!letter.trim()) {
      setNotification("Digite uma letra!")
      setTimeout(() => setNotification(""), 2000)
      return
    }

    const value = letter.toLocaleUpperCase()
    const exists = lettersUsed.find(
      (used) => used.value.toLocaleUpperCase() === value
    )

    if (exists) {
      setLetter("")
      setNotification(`Letra ${value} já foi usada!`)
      setTimeout(() => setNotification(""), 2000)
      inputRef.current?.focus()
      return
    }

    const hits = challenge.word
      .toLocaleUpperCase()
      .split("")
      .filter((char) => char === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLettersUsed((prev) => [...prev, { value, correct }])
    setScore(currentScore)
    setLetter("")
    inputRef.current?.focus()

    if (!correct) {
      setShake(true)
      setTimeout(() => setShake(false), 300)
    }
  }

  function endGame(message: string) {
    setModalMessage(message)
    setModalOpen(true)
  }

  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if (!challenge) return

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você descobriu a palavra!")
      }

      const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN
      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você usou todas as tentativas!")
      }
    }, 200)
  }, [score, lettersUsed.length])

  if (!challenge) return null

  return (
    <div className={`${styles.container} ${shake && styles.shake}`}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((char, index) => {
            const revealed = lettersUsed.some(
              (used) => used.correct && used.value.toUpperCase() === char.toUpperCase()
            )
            return (
              <Letter
                key={index}
                value={revealed ? char.toUpperCase() : ""}
                color="default"
              />
            )
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            ref={inputRef}
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        {notification && <p className={styles.notification}>{notification}</p>}

        <LettersUsed data={lettersUsed} />
      </main>

      <Modal
        open={modalOpen}
        title="Fim de jogo"
        message={modalMessage}
        onClose={startGame}
      />
    </div>
  )
}