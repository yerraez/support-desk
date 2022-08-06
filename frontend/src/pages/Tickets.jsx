import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import { BackButton } from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets)

  console.log("tickets", tickets)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('UseEffect linea 12')
    return () => {

      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    console.log('UseEffect linea 23')
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets !== undefined && tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets