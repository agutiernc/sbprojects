function createAccount(pin, amount = 0) {
  return {
    checkBalance(currPin) {
      return currPin !== pin ? 'Invalid PIN.' : `$${amount}`;
    },
    deposit(currPin, newAmount) {
      if (currPin !== pin) return 'Invalid PIN.';

      amount += newAmount;

      return `Succesfully deposited $${newAmount}. Current balance: $${amount}.`;
    },
    withdraw(currPin, getAmount) {
      if (currPin !== pin) return 'Invalid PIN.';

      if (getAmount > amount) {
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      }

      amount -= getAmount;

      return `Succesfully withdrew $${getAmount}. Current balance: $${amount}.`;
    },
    changePin(currPin, newPin) {
      if (pin !== currPin) return 'Invalid PIN.';

      pin = newPin;

      return 'PIN successfully changed!';
    }
  }
}

module.exports = { createAccount };
