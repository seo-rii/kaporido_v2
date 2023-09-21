// @ts-ignore
import JSConfetti from 'js-confetti'

let jsConfetti: JSConfetti;

export function throwConfetti(kaist = true) {
    if (!jsConfetti) jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
        confettiRadius: 4,
        confettiNumber: 700,
        confettiColors: kaist?['#4260f5', '#42d4f5', '#4287f5']:['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
    })
}
