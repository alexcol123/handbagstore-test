import Status from '../Status'

import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md'

import { VscError } from 'react-icons/vsc'

const DeliveryActions = ({deliveryStatus}) => {


  return (
    <div>
      {deliveryStatus === 'pending' ? (
        <Status
          text={deliveryStatus}
          icon={MdAccessTimeFilled}
          bgColor={'bg-base-200'}
          textColor='text-base-content'
        />
      ) : deliveryStatus === 'dispatched' ? (
        <Status
          text={deliveryStatus}
          icon={MdDeliveryDining}
          bgColor={'bg-warning'}
          textColor='text-warning-content'
        />
      ) : deliveryStatus === 'delivered' ? (
        <Status
          text={deliveryStatus}
          icon={MdDone}
          bgColor={'bg-success'}
          textColor='text-success-content'
        />
      ) : deliveryStatus === 'returned' ? (
        <Status
          text={deliveryStatus}
          icon={VscError}
          bgColor={'bg-error'}
          textColor='text-error-content'
        />
      ) : (
        <Status
          text={'NO DATA'}
          icon={MdDeliveryDining}
          bgColor={'bg-primary'}
          textColor='text-primary-content'
        />
      )}
    </div>
  )
}

export default DeliveryActions
