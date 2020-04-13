import React from 'react';
import './ModalTransactionAdd.scss';
import { connect } from 'react-redux';
import { createTransaction } from '../../store/actions/transactions';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DotNav from '../DotNav/DotNav';
import InputDropdownSelect from '../InputDropdownSelect/InputDropdownSelect';

// TODOS:
// Add whoPaid, whoBenefited fields
// Add sliding steps

class ModalTransactionAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: '',
      currency: '',
      amount: 0,
      whopaid: 'asdf',
      currentDotLink: 'step1'
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleCreateTransaction = this.handleCreateTransaction.bind(this); 
    this.handleChangeStep = this.handleChangeStep.bind(this);
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

  handleChangeStep(link) {
    this.setState({
      currentDotLink: link
    });
  }

  render() {
    const { showModal, handleModalClose } = this.props;
    const { title, date, currency, amount, whopaid, currentDotLink } = this.state;
    const { handleInput, handleCreateTransaction, handleChangeStep } = this;
    return (
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Body>
          <div className="modal-transaction-add-component">
            <h4 className="mb-4">New Transaction</h4>

            {/* Step 1 */}
            { currentDotLink === 'step1' && 
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
                </div>
              </form>
            }

            {/* Step 2 */}
            { currentDotLink === 'step2' && 
              <>
                <div className="form-group">
                  <label className="mb-0">Who Paid?</label>
                  <InputDropdownSelect/>
                </div>
                <div className="persons-paid">
                </div>
              </>
            }

            <DotNav
              links={["step1", "step2"]}
              currentLink={currentDotLink}
              handleLinkClick={handleChangeStep}
            />

            {/* Step 1 Buttons */}
            { currentDotLink === 'step1' && 
              <div>
                <button
                  type="button"
                  className="btn btn-primary float-right mt-4"
                  onClick={() => handleChangeStep('step2')}
                >Next</button>
                <button
                  type="button"
                  className="btn btn-secondary float-right mt-4 mr-3"
                  onClick={handleModalClose}
                >Cancel</button>
              </div>
            }

            {/* Step 2 Buttons */}
            { currentDotLink === 'step2' && 
              <div>
                <button
                  type="button"
                  className="btn btn-primary float-left mt-4"
                  onClick={() => handleChangeStep('step1')}
                >Back</button>
                <button
                  type="button"
                  className="btn btn-primary float-right mt-4"
                  onClick={() => handleChangeStep('step3')}
                >Next</button>
                <button
                  type="button"
                  className="btn btn-secondary float-right mt-4 mr-3"
                  onClick={handleModalClose}
                >Cancel</button>
              </div>
            }
          </div>
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