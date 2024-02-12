import React from 'react'
import UpdateBannerForm from './UpdateBannerForm'

import FormWrap from '../../../components/FormWrap'

import getCurrentUser from '../../../../actions/getCurrentUser'
import { redirect } from 'next/navigation'
import getBanner from '@/actions/getBanner'

const UpdateBannerPage = async () => {
  const currentUser = await getCurrentUser()
  const banner = await getBanner ()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <FormWrap>
        <UpdateBannerForm banner={banner}/>
      </FormWrap>
    </div>
  )
}

export default UpdateBannerPage
