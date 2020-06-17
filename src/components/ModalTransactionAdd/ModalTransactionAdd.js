import React from 'react';
import './ModalTransactionAdd.scss';
import { connect } from 'react-redux';
import { createTransaction } from '../../store/actions/transactions';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DotNav from '../DotNav/DotNav';
import InputDropdownSelect from '../InputDropdownSelect/InputDropdownSelect';
import * as _ from 'lodash';

class ModalTransactionAdd extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      title: '',
      date: '',
      currency: '',
      amount: 0.00,
      whoPaid: [],
      whoPaidInput: '',
      whoBenefited: [...this.props.tab.persons],
      whoBenefitedInput: '',
      currentDotLink: 'step1'
    }

    this.state = _.cloneDeep(this.defaultState);

    this.handleInput = this.handleInput.bind(this);
    this.handleCreateTransaction = this.handleCreateTransaction.bind(this); 
    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.addWhoPaid = this.addWhoPaid.bind(this);
    this.addNewWhoPaid = this.addNewWhoPaid.bind(this);
    this.addWhoBenefited = this.addWhoBenefited.bind(this);
    this.addNewWhoBenefited = this.addNewWhoBenefited.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateTransaction(e) {
    e.preventDefault();

    let dollars = parseFloat(this.state.amount).toFixed(0);
    let cents = (parseFloat(this.state.amount) - dollars).toFixed(2) * 100;

    let transaction = {
      name: this.state.title,
      date: this.state.date,
      amountDollars: dollars,
      amountCents: cents,
      ledger: this.props.tab._id,
      whoPaid: this.state.whoPaid,
      whoBenefited: this.state.whoBenefited
    }
    this.props.createTransaction(transaction);
    toast(`Transaction for $${this.state.amount} added!`);
    this.cancel();
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
    if(this.state.whoPaid.includes(this.state.whoPaidInput)) {
      toast.error('This name is already on the list');
      return;
    }
    this.setState({
      whoPaid: [...this.state.whoPaid, "(new)" + this.state.whoPaidInput]
    });
  }

  addWhoBenefited(person) {
    if(this.state.whoBenefited.includes(person)) {
      toast.error('Cannot add same person twice');
      return;
    }
    this.setState({
      whoBenefited: [...this.state.whoBenefited, person]
    })
  }

  addNewWhoBenefited() {
    if(this.state.whoBenefited.includes(this.state.whoBenefitedInput)) {
      toast.error('This name is already on the list');
      return;
    }
    this.setState({
      whoBenefited: [...this.state.whoBenefited, "(new)" + this.state.whoBenefitedInput]
    });
  }

  cancel() {
    this.props.handleModalClose();
    setTimeout(
      () => this.setState({
        ...this.defaultState
      })
    , 200);
  }

  render() {
    const { showModal, handleModalClose, tab } = this.props;
    const { title, date, currency, amount, whoPaid, whoPaidInput, whoBenefited, whoBenefitedInput, currentDotLink } = this.state;
    const { handleInput, handleCreateTransaction, handleChangeStep, addNewWhoPaid, addWhoPaid, addNewWhoBenefited, addWhoBenefited } = this;
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
                  TODO: Add currency to app
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
                  <label className="mb-0">Amount ($USD)</label>
                  <input
                    type="number"
                    min="0.00"
                    max="100000.00"
                    step="any"
                    className="form-control mb-3"
                    name="amount"
                    placeholder="0.00"
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
                <div className="form-group mb-1">
                  <label className="mb-0">Who Paid?</label>
                  <InputDropdownSelect
                    optionList={tab.persons.filter((person) => !whoPaid.includes(person))}
                    value={whoPaidInput}
                    onValueChange={(value) => this.setState({whoPaidInput: value})}
                    actionOption={true}
                    actionOptionString={`Add new person "${whoPaidInput}"`}
                    onActionOptionSelect={addNewWhoPaid}
                    onSelect={(person) => addWhoPaid(person)}
                    emptyListMessage={'-- No more persons in tab --'}
                  />
                </div>
                <div className="persons-paid">
                  { whoPaid.map((person) => (
                    <div className="person-chip mr-2 my-2" key={person}>

                      <span>{person}</span>
                      <i class="fas fa-times ml-3"></i>
                    </div>
                  ))}
                </div>
              </>
            }

            {/* Step 3 */}
            { currentDotLink === 'step3' && 
              <>
                <div className="form-group">
                  <label className="mb-0">Who Benefited?</label>
                  <InputDropdownSelect
                    optionList={tab.persons.filter((person) => !whoBenefited.includes(person))}
                    value={whoBenefitedInput}
                    onValueChange={(value) => this.setState({whoBenefitedInput: value})}
                    actionOption={true}
                    actionOptionString={`Add new person "${whoBenefitedInput}"`}
                    onActionOptionSelect={addNewWhoBenefited}
                    onSelect={(person) => addWhoBenefited(person)}
                    emptyListMessage={'-- No more persons in tab --'}
                  />
                </div>
                <div className="persons-benefited">
                  { whoBenefited.map((person) => (
                    <span key={person}>{person}</span>
                  ))}
                </div>
              </>
            }

            <DotNav
              links={["step1", "step2", "step3"]}
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
                  onClick={this.cancel}
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
                  onClick={this.cancel}
                >Cancel</button>
              </div>
            }

            {/* Step 3 Buttons */}
            { currentDotLink === 'step3' && 
              <div>
                <button
                  type="button"
                  className="btn btn-primary float-left mt-4"
                  onClick={() => handleChangeStep('step2')}
                >Back</button>
                <button
                  type="button"
                  className="btn btn-primary float-right mt-4"
                  onClick={handleCreateTransaction}
                >Done</button>
                <button
                  type="button"
                  className="btn btn-secondary float-right mt-4 mr-3"
                  onClick={this.cancel}
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