

// تعريف قائمة البطاقات، تحتوي على أزواج من الرموز.
const cards = [
    { id: 1, symbol: '🐶' },
    { id: 2, symbol: '🐱' },
    { id: 3, symbol: '🐭' },
    { id: 4, symbol: '🐹' },
    { id: 5, symbol: '🐰' },
    { id: 1, symbol: '🐶' },
    { id: 2, symbol: '🐱' },
    { id: 3, symbol: '🐭' },
    { id: 4, symbol: '🐹' },
    { id: 5, symbol: '🐰' }
];

// تعريف المتغيرات اللازمة للتحكم في اللعبة.
let firstCard = null; // البطاقة الأولى التي تم قلبها.
let secondCard = null; // البطاقة الثانية التي تم قلبها.
let lockBoard = false; // يمنع التفاعل مع اللوحة أثناء التحقق من التطابق.
let attempts = 0; // عدد المحاولات غير الناجحة.
let matchedPairs = 0; // عدد الأزواج المتطابقة.

function shuffleCards() {
    // خلط البطاقات عشوائيًا.
    cards.sort(() => 0.5 - Math.random());
}

function createBoard() {
    // إنشاء اللوحة وتجهيزها بالبطاقات.
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // مسح محتوى اللوحة الحالي.

    shuffleCards(); // خلط البطاقات.

    // إنشاء عناصر البطاقات وإضافتها إلى اللوحة.
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id; // تخزين معرّف البطاقة في بيانات العنصر.
        cardElement.dataset.index = index; // تخزين موقع البطاقة في البيانات.
        cardElement.addEventListener('click', flipCard); // إضافة حدث النقر.
        gameBoard.appendChild(cardElement);
    });

    showAllCards(); // عرض البطاقات لمدة 3 ثوانٍ قبل قلبها.
}

function showAllCards() {
    // عرض جميع البطاقات لمدة 3 ثوانٍ.
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((card, index) => {
        card.classList.add('flipped'); // قلب البطاقة.
        card.textContent = cards[index].symbol; // عرض رمز البطاقة.
    });

    setTimeout(() => {
        cardElements.forEach((card) => {
            card.classList.remove('flipped'); // إعادة البطاقة إلى وضعها الأصلي.
            card.textContent = ''; // إزالة رمز البطاقة.
        });
    }, 1700); // تأخير لمدة 3 ثوانٍ قبل قلب البطاقات.
}

function flipCard() {
    // التعامل مع نقر البطاقة.
    if (lockBoard) return; // إذا كانت اللوحة مغلقة، لا تفعل شيئًا.

    const card = this;
    if (card === firstCard) return; // إذا كانت البطاقة هي نفسها الأولى، لا تفعل شيئًا.

    card.classList.add('flipped'); // قلب البطاقة.
    card.textContent = cards[card.dataset.index].symbol; // عرض رمز البطاقة.

    if (!firstCard) {
        // إذا لم تكن هناك بطاقة أولى، قم بتعيين البطاقة الحالية كأولى.
        firstCard = card;
    } else {
        // إذا كانت هناك بطاقة أولى، قم بتعيين البطاقة الحالية كالثانية.
        secondCard = card;
        checkMatch(); // التحقق مما إذا كانت البطاقتين متطابقتين.
    }
}

function checkMatch() {
    // التحقق مما إذا كانت البطاقتين متطابقتين.
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        // إذا كانت البطاقتين متطابقتين.
        disableCards(); // تعطيل البطاقات المتطابقة.
        matchedPairs++; // زيادة عدد الأزواج المتطابقة.
        if (matchedPairs === cards.length / 2) {
            // إذا تم العثور على جميع الأزواج.
            setTimeout(() => {
                alert(`تهانينا! لقد انتهيت من اللعبة مع ${attempts} محاولة خاطئة.`); // عرض رسالة تهنئة.
            }, 500);
        }
    } else {
        // إذا لم تكن البطاقتين متطابقتين.
        attempts++; // زيادة عدد المحاولات غير الناجحة.
        unflipCards(); // إعادة البطايق إلى وضعها الأصلي.
    }
}

function disableCards() {
    // تعطيل البطاقات المتطابقة.
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard(); // إعادة تعيين اللوحة.
}

function unflipCards() {
    // إعادة البطايق إلى وضعها الأصلي.
    lockBoard = true; // قفل اللوحة مؤقتًا.
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard(); // إعادة تعيين اللوحة.
    }, 1000); // تأخير لمدة ثانية واحدة.
}

function resetBoard() {
    // إعادة تعيين المتغيرات بعد كل عملية.
    [firstCard, secondCard] = [null, null];
    lockBoard = false; // فتح اللوحة للتفاعل.
}

// بدء اللعبة بإنشاء اللوحة.
createBoard();


