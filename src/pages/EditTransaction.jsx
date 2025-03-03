import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateTransaction, reset } from '../features/transactions/transactionSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import DatePicker from 'react-datepicker';
import '../css/form.css';
import 'react-datepicker/dist/react-datepicker.css';

const EditTransaction = () => {
  const { transaction, isLoading, isError, isSuccess, message } = useSelector((state) => state.transactions); 

  const dispatch = useDispatch();
  const { transactionId } = useParams();

  const [transactionType, setTransactionType] = useState(transaction.transactionType);
  const [date, setDate] = useState(transaction.date);
  const [exCategory, setExCategory] = useState(transaction.exCategory);
  const [inCategory, setInCategory] = useState(transaction.inCategory);
  const [subject, setSubject] = useState(transaction.subject);
  const [amount, setAmount] = useState(transaction.amount);
  const [taxRate, setTaxRate] = useState(transaction.taxRate);
  const [note, setNote] = useState(transaction.note);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    return <Spinner/>;
  }

  const handleTypeClick = (e) => {
    const checked = e.target.checked;
    checked ? setTransactionType('expense') : setTransactionType('income');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      transactionType,
      date,
      exCategory,
      inCategory,
      subject,
      amount,
      taxRate,
      note
    }

    dispatch(updateTransaction({ id:transactionId, data:newTransaction}));
  }

  return (
    <div className="container">
      <BackButton url='/'/>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input type="checkbox" name="transactionType" value={transactionType} id="transactionType" onClick={handleTypeClick} className="toggle-checkbox" defaultChecked/>
          <label htmlFor="transactionType" className='toggle-container'><span>Income</span><span>Expense</span></label>
        </fieldset>

        <fieldset>
          <label htmlFor='date'>Spent on</label>
          <DatePicker selected={date} onChange={(date) => setDate(date)}/>
        </fieldset>

        { transactionType == 'expense' ? (
          <fieldset>
          <label htmlFor="category-ex">Category</label>
          <select id="category-ex" defaultValue={exCategory} onChange={(e) => setExCategory(e.target.value)}>
            <option value=''> -- select a category -- </option>
            <option value='food'>Food</option>
            <option value='housing'>Housing</option>
            <option value='clothes'>Clothes</option>
            <option value='communication'>Communication</option>
            <option value='transportation'>Transportation</option>
            <option value='education'>Education</option>
            <option value='leisure'>Leisure</option>
            <option value='beauty'>Beauty</option>
            <option value='gift'>Gift</option>
            <option value='medical'>Medical</option>
            <option value='household'>Household goods</option>
            <option value='insurance'>Insurance</option>
            <option value='others'>Others</option>
          </select>
          </fieldset>
        ) : (
          <fieldset>
            <label htmlFor='category-in'>Category</label>
            <select id='category-in' defaultValue={inCategory} onChange={ (e) => setInCategory(e.target.value) }>
              <option value=''> -- select a category -- </option>
              <option value='wage'>Wage</option>
              <option value='dividend'>Dividend</option>
              <option value='interest'>Interest</option>
              <option value='gift'>Gift</option>
              <option value='gift'>Pension</option>
              <option value='tax'>Tax return</option>
            </select>
          </fieldset>
        )} 

        <fieldset>
          <label htmlFor='subject'>Subject</label>
          <input type='text' id='subject' value={subject} onChange={(e) => setSubject(e.target.value) }/>
        </fieldset>

        <fieldset>
          <label htmlFor='amount'>Amount</label>
          <input type='number' id='amount' value={amount} placeholder='0.00' step="0.01" required name='amount' onChange={(e) => setAmount(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='taxRate'>Tax rate</label>
          <input type='number' id='taxRate' value={taxRate} placeholder='0.00' step="0.01" required name='amount'  onChange={(e) => setTaxRate(e.target.value)}/>%
        </fieldset>

        <fieldset>
          <label htmlFor='note'>Note</label>
          <textarea id='note' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
        </fieldset>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditTransaction;