const EXTENSION_NAME = 'No Infinite Scroll'
const BIG_NUMBER = 10000
let timeoutId;
let maxClientHeight = null

const heightIncreased = () => {
    // base case
    if (!maxClientHeight) {
        maxClientHeight = document.body.clientHeight
    } else {
        if (maxClientHeight < document.body.clientHeight) {
            console.log(`[${EXTENSION_NAME}] Possibly infinite scroll detected`)
            maxClientHeight = document.body.clientHeight
            return true
        }
        return false
    }
}

const getRandomMessage = () => {
    const questions = ['Hey, is this infinite scroll website truly important for you? ', 'Are you still doing what you initially meant to do?', 'Do you know that infinite scroll is highly addictive?']
    const actions = ['Breath deeply, and think about it for a while.', 'Inhale and exale for a moment. Be mindful to stay productive and happy.', 'You face tsunami of infomation nowadays, but your attention is finite.']
    var min = 0;
    var max = Math.max(questions.length) - 1

    const qIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    const aIndex = Math.floor(Math.random() * (max + 1 - min)) + min;

    return questions[qIndex] + ' ' + actions[aIndex]
}

const initSpeedBumpModal = () => {
    // modalWrapper
    const modalWrapper = document.createElement('div')
    modalWrapper.style.backgroundColor = '#738276'
    modalWrapper.style.zIndex = BIG_NUMBER
    modalWrapper.style.position = 'fixed'
    modalWrapper.style.top = '0px'
    modalWrapper.style.left = '0px'
    modalWrapper.style.height = '100%'
    modalWrapper.style.width = '100%'
    modalWrapper.style.display = 'none'

    // speedBumpMessageContainer
    const speedBumpMessageContainer = document.createElement('div')
    speedBumpMessageContainer.style.backgroundColor = '#738276'
    speedBumpMessageContainer.style.color = 'white'
    speedBumpMessageContainer.innerHTML = getRandomMessage()
    speedBumpMessageContainer.style.margin = '20px'
    speedBumpMessageContainer.style.height = '800px'
    speedBumpMessageContainer.style.width = '800px'
    speedBumpMessageContainer.style.margin = '0 auto'
    speedBumpMessageContainer.style.display = 'flex'
    speedBumpMessageContainer.style.alignItems = 'center'
    speedBumpMessageContainer.style.justifyContent = 'center'

    const gotitButton = document.createElement('div')
    gotitButton.innerText = 'Click here to dismiss.'
    gotitButton.style.color = 'white'
    gotitButton.style.margin = '10px'
    gotitButton.onclick = closeSpeedBumpModal
    gotitButton.style.position = 'fixed'
    gotitButton.style.right = '0px'
    gotitButton.style.bottom = '0px'

    speedBumpMessageContainer.appendChild(gotitButton)
    modalWrapper.appendChild(speedBumpMessageContainer)
    document.body.appendChild(modalWrapper)
    return modalWrapper
}
const showSpeedBumpModal = () => {
    modalWrapper.style.display = 'block'
}
const closeSpeedBumpModal = () => {
    modalWrapper.style.display = 'none'
}

const modalWrapper = initSpeedBumpModal()

window.addEventListener("scroll", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        if (heightIncreased()) {
            showSpeedBumpModal()
        }
    }, 500);
})