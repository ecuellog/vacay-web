export default class Calculator {
  static balances(transactions, persons) {
    let balances = new Map();
    let totalDollars = 0;
    let totalCents = 0;
    let countedTotal = false;

    persons.forEach(person => {
      balances.set(person, {
        dollars: 0,
        cents: 0,
        total: 0
      })

      transactions.forEach(transaction => {
        if(transaction.whoPaid.includes(person)){
          let newAmounts = balances.get(person);
          newAmounts.dollars += transaction.amountDollars/transaction.whoPaid.length;
          newAmounts.cents += transaction.amountCents/transaction.whoPaid.length;
          balances.set(person, newAmounts);
        }
        if(transaction.whoBenefited.includes(person)){
          let newAmounts = balances.get(person);
          newAmounts.dollars -= transaction.amountDollars/transaction.whoBenefited.length;
          newAmounts.cents -= transaction.amountCents/transaction.whoBenefited.length;
          balances.set(person, newAmounts);
        }
        let newTotal = balances.get(person);
        newTotal.total = (newTotal.dollars + (newTotal.cents / 100)).toFixed(2);
        balances.set(person, newTotal);

        if(!countedTotal) {
          totalDollars += transaction.amountDollars;
          totalCents += transaction.amountCents;
        }
      });

      countedTotal = true;
    });

    let total = (totalDollars + (totalCents / 100)).toFixed(2);

    return { balances, total };
  }
}