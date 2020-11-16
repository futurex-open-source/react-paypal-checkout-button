/* eslint-disable no-unused-vars */
import React from 'react'
import { SpinnerProps } from '../types'

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) =>
  isLoading ? <div className='spinner' /> : null

export default Spinner
