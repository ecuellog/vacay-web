export default class Calculator {
  static balances(transactions, participants) {
    let balances = new Map();
    let totalDollars = 0;
    let totalCents = 0;
    let countedTotal = false;

    participants.forEach(participant => {
      balances.set(participant.friend, {
        dollars: 0,
        cents: 0,
        total: 0
      })

      transactions.forEach(transaction => {
        if(transaction.whoPaid.includes(participant.friend)){
          let newAmounts = balances.get(participant.friend);
          newAmounts.dollars += transaction.amountDollars/transaction.whoPaid.length;
          newAmounts.cents += transaction.amountCents/transaction.whoPaid.length;
          balances.set(participant.friend, newAmounts);
        }
        if(transaction.whoBenefited.includes(participant.friend)){
          let newAmounts = balances.get(participant.friend);
          newAmounts.dollars -= transaction.amountDollars/transaction.whoBenefited.length;
          newAmounts.cents -= transaction.amountCents/transaction.whoBenefited.length;
          balances.set(participant.friend, newAmounts);
        }
        let newTotal = balances.get(participant.friend);
        newTotal.total = (newTotal.dollars + (newTotal.cents / 100)).toFixed(2);
        balances.set(participant.friend, newTotal);

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