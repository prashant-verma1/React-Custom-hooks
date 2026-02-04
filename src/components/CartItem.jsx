import { FaTrash, FaPlus, FaMinus} from 'react-icons/fa'

function CartItem({item, onUpdateQuantity, onRemove}) {
  return (
    <div className='cart-item'>
      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="quantity-controls">
          <button onClick={()=>onUpdateQuantity(item.id, item.quantity -1)}>
            <FaMinus/>
          </button>
          <span>{item.quantity}</span>
          <button onClick={()=>onUpdateQuantity(item.id, item.quantity + 1)}>
            <FaPlus/>
          </button>
        </div>
      </div>
      <div>
        <button className="remove-btn" onClick={()=>onRemove(item.id)}><FaTrash/></button>
      </div>
    </div>
  )
}

export default CartItem;