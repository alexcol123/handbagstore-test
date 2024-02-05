import Status from '../Status'

import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md'

import { VscError } from 'react-icons/vsc'

const PaymentActions = ({pmtStatus}) => {
  return (
    <div>
      {pmtStatus === 'pending' ? (
        <Status
          text={pmtStatus}
          icon={MdAccessTimeFilled}
          bgColor={'bg-base-200'}
          textColor='text-base-content'
        />
      ) : pmtStatus === 'complete' ? (
        <Status
          text={pmtStatus}
          icon={MdDone}
          bgColor={'bg-success'}
          textColor='text-success-content'
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

export default PaymentActions
