import React from 'react';
import './ModalTransactionAdd.scss';
import { connect } from 'react-redux';
import { createTransaction } from '../../store/actions/transactions';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

// TODOS:
// Add whoPaid, whoBenefited fields
// 

class ModalTransactionAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: '',
      currency: '',
      amount: 0
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleCreateTransaction = this.handleCreateTransaction.bind(this); 
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateTransaction(e) {
    e.preventDefault();
    let transaction = {
      name: this.state.title,
      date: this.state.date,
      amount: this.state.amount,
      ledger: this.props.tabId
    }
    this.props.createTransaction(transaction);
    this.props.handleModalClose();
    toast('Transaction created!');
  }

  render() {
    const { showModal, handleModalClose } = this.props;
    const { title, date, currency, amount } = this.state;
    const { handleInput, handleCreateTransaction } = this;
    return (
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Body>
          <h4 className="mb-4">New Transaction</h4>
          <form>
            <div className="form-group">
              <label className="mb-0">Title</label>
              <input
                type="text"
                className="form-control mb-3"
                name="title"
                placeholder="Expensive Dinner"
                value={title}
                onChange={handleInput}
              ></input>
              {/*
              <label className="mb-0">Currency</label>
              <input
                type="text"
                className="form-control mb-3"
                name="currency"
                placeholder="CAD"
                value={currency}
                onChange={handleInput}
              ></input>
              */}
              <label className="mb-0">Amount ($CAD)</label>
              <input
                type="number"
                className="form-control mb-3"
                name="amount"
                placeholder="Expensive Dinner"
                value={amount}
                onChange={handleInput}
              ></input>
              <label className="mb-0">Date</label>
              <input
                type="text"
                className="form-control mb-3"
                name="date"
                placeholder="14/03/2020"
                value={date}
                onChange={handleInput}
              ></input>
              <button
                type="button"
                className="btn btn-primary float-right mt-5"
                onClick={handleCreateTransaction}
              >Next</button>
              <button
                type="button"
                className="btn btn-secondary float-right mt-5 mr-3"
                onClick={handleModalClose}
              >Cancel</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTransactions: (tabId, transaction) => dispatch(createTransaction(tabId, transaction))
  }
}

export default connect(null, mapDispatchToProps)(ModalTransactionAdd);