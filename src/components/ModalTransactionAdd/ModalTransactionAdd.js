import React, { useState } from 'react';
import './ModalTransactionAdd.scss';
import { connect } from 'react-redux';
import { createTransaction } from '../../store/actions/transactions';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DotNav from '../DotNav/DotNav';
import InputDropdownSelect from '../InputDropdownSelect/InputDropdownSelect';
import * as _ from 'lodash';

function ModalTransactionAdd(props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0.00);
  const [whoPaid, setWhoPaid] = useState([]);
  const [whoPaidInput, setWhoPaidInput] = useState('');
  const [whoBenefited, setWhoBenefited] = useState([...props.tab.persons]);
  const [whoBenefitedInput, setWhoBenefitedInput] = useState('');
  const [currentDotLink, setCurrentDotLink] = useState('step1');

  function handleCreateTransaction(e) {
    e.preventDefault();

    let dollars = parseFloat(amount).toFixed(0);
    let cents = (parseFloat(amount) - dollars).toFixed(2) * 100;

    let transaction = {
      name: title,
      date: date,
      amountDollars: dollars,
      amountCents: cents,
      ledger: props.tab._id,
      whoPaid: whoPaid,
      whoBenefited: whoBenefited
    }

    props.createTransaction(transaction);
    toast(`Transaction for $${amount} added!`);
    cancel();
  }

  function handleChangeStep(link) {
    setCurrentDotLink(link);
  }

  function addWhoPaid(person) {
    if(whoPaid.includes(person)) {
      toast.error('Cannot add same person twice');
      return;
    }
    setWhoPaid([...whoPaid, person]);
  }

   function addNewWhoPaid() {
    if(whoPaid.includes(whoPaidInput)) {
      toast.error('This name is already on the list');
      return;
    }
    setWhoPaid([...whoPaid, "(New) " + whoPaidInput]);
  }

  function deletePaid(i) {
    let newWhoPaid = _.cloneDeep(whoPaid);
    newWhoPaid.splice(i, 1);
    setWhoPaid(newWhoPaid);
  }

  function addWhoBenefited(person) {
    if(whoBenefited.includes(person)) {
      toast.error('Cannot add same person twice');
      return;
    }
    setWhoBenefited([...whoBenefited, person]);
  }

  function addNewWhoBenefited() {
    if(whoBenefited.includes(whoBenefitedInput)) {
      toast.error('This name is already on the list');
      return;
    }
    setWhoBenefited([...whoBenefited, "(New) " + whoBenefitedInput]);
  }

  function deleteBenefited(i) {
    let newWhoBenefited = _.cloneDeep(whoBenefited);
    newWhoBenefited.splice(i, 1);
    setWhoBenefited(newWhoBenefited);
  }

  function cancel() {
    props.handleModalClose();
    setTimeout(
      () => {
        setTitle('');
        setDate('');
        setCurrency('');
        setAmount(0.00);
        setWhoPaid([]);
        setWhoPaidInput('');
        setWhoBenefited([]);
        setWhoBenefitedInput('');
        setCurrentDotLink('step1');
      }
    , 200);
  }

  return (
    <Modal show={props.showModal} onHide={props.handleModalClose}>
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
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
                <label className="mb-0">Date</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="date"
                  placeholder="14/03/2020"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  optionList={props.tab.persons.filter((person) => !whoPaid.includes(person))}
                  value={whoPaidInput}
                  onValueChange={(value) => setWhoPaidInput(value)}
                  actionOption={true}
                  actionOptionString={`Add new person "${whoPaidInput}"`}
                  onActionOptionSelect={addNewWhoPaid}
                  onSelect={(person) => addWhoPaid(person)}
                  emptyListMessage={'-- No more persons in tab --'}
                />
              </div>
              <div className="persons-paid">
                { whoPaid.map((person, i) => (
                  <div className="person-chip mr-2 my-2" key={person}>
                    <span>{person}</span>
                    <i className="fas fa-times ml-3" onClick={() => deletePaid(i)}></i>
                  </div>
                ))}
              </div>
            </>
          }

          {/* Step 3 */}
          { currentDotLink === 'step3' && 
            <>
              <div className="form-group mb-1">
                <label className="mb-0">Who Benefited?</label>
                <InputDropdownSelect
                  optionList={props.tab.persons.filter((person) => !whoBenefited.includes(person))}
                  value={whoBenefitedInput}
                  onValueChange={(value) => setWhoBenefitedInput(value)}
                  actionOption={true}
                  actionOptionString={`Add new person "${whoBenefitedInput}"`}
                  onActionOptionSelect={addNewWhoBenefited}
                  onSelect={(person) => addWhoBenefited(person)}
                  emptyListMessage={'-- No more persons in tab --'}
                />
              </div>
              <div className="persons-benefited">
                { whoBenefited.map((person, i) => (
                  <div className="person-chip mr-2 my-2" key={person}>
                    <span>{person}</span>
                    <i className="fas fa-times ml-3" onClick={() => deleteBenefited(i)}></i>
                  </div>
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
                onClick={cancel}
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
                onClick={cancel}
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
                onClick={cancel}
              >Cancel</button>
            </div>
          }
        </div>
      </Modal.Body>
    </Modal>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    createTransaction: (tabId, transaction) => dispatch(createTransaction(tabId, transaction))
  }
}

export default connect(null, mapDispatchToProps)(ModalTransactionAdd);