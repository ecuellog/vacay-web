import React from 'react';
import './ModalTransactionAdd.scss';
import { connect } from 'react-redux';
import { createTransaction } from '../../store/actions/transactions';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DotNav from '../DotNav/DotNav';
import InputDropdownSelect from '../InputDropdownSelect/InputDropdownSelect';

class ModalTransactionAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: '',
      currency: '',
      amount: 0,
      whoPaid: [],
      whoPaidInput: '',
      currentDotLink: 'step1'
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleCreateTransaction = this.handleCreateTransaction.bind(this); 
    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.addWhoPaid = this.addWhoPaid.bind(this);
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
      ledger: this.props.tab._id
    }
    this.props.createTransaction(this.props.tab, transaction);
    this.props.handleModalClose();
    toast('Transaction created!');
  }

  handleChangeStep(link) {
    this.setState({
      currentDotLink: link
    });
  }

  addWhoPaid(person) {
    if(this.state.whoPaid.includes(person)) {
      toast.error('Cannot add same person twice');
      return;
    }
    this.setState({
      whoPaid: [...this.state.whoPaid, person]
    })
  }

  addNewWhoPaid() {
    //TODO
    return;
  }

  render() {
    const { showModal, handleModalClose, tab } = this.props;
    const { title, date, currency, amount, whoPaid, whoPaidInput, currentDotLink } = this.state;
    const { handleInput, handleCreateTransaction, handleChangeStep, addNewWhoPaid, addWhoPaid } = this;
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
                  <InputDropdownSelect
                    optionList={tab.persons.filter((person) => !whoPaid.includes(person))}
                    value={whoPaidInput}
                    onValueChange={(value) => this.setState({whoPaidInput: value})}
                    actionOption={true}
                    actionOptionString={`Add new person "${whoPaidInput}"`}
                    actionOptionClicked={addNewWhoPaid}
                    onSelect={(person) => addWhoPaid(person)}
                    emptyListMessage={'-- No more persons in tab --'}
                  />
                </div>
                <div className="persons-paid">
                  { whoPaid.map((person) => (
                    <p key={person}>{person}</p>
                  ))}
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
    createTransaction: (tabId, transaction) => dispatch(createTransaction(tabId, transaction))
  }
}

export default connect(null, mapDispatchToProps)(ModalTransactionAdd);