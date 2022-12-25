import React from 'react'

import AdminToolbar from '../../../components/navigation/AdminToolbar'
import PitchManagementToolbar from '../../../components/navigation/PitchManagamentToolbar'
// external toolbox imports 
import { Box } from "@chakra-ui/react"

const PitchManagement = () => {
  return (
    <Box bg="#080808" h="100vh">
      <AdminToolbar />
      <PitchManagementToolbar/>
    </Box>
  )
}

export default PitchManagement