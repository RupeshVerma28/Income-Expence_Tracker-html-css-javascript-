const balance = document.getElementById('balance');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = [];

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const totalBalance = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const totalIncome = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const totalExpense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  balance.innerText = `₹${totalBalance}`;
  incomeAmount.innerText = `₹${totalIncome}`;
  expenseAmount.innerText = `₹${Math.abs(totalExpense)}`;
}

function addTransactionToDOM(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-';
  const li = document.createElement('li');
  li.classList.add('transaction', transaction.amount > 0 ? 'income' : 'expense');
  li.innerHTML = `
    ${transaction.description} <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  transactionList.appendChild(li);
}


function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}


function updateUI() {
  transactionList.innerHTML = '';
  transactions.forEach(addTransactionToDOM);
  updateValues();
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (descriptionInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please add a description and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    description: descriptionInput.value,
    amount: +amountInput.value
  };

  transactions.push(transaction);
  updateUI();

  descriptionInput.value = '';
  amountInput.value = '';
});
