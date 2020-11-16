/* eslint-disable no-unused-vars */
import React from 'react'
import { SpinnerProps } from '../types'
import styles from '../styles.module.css'

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) =>
  isLoading ? <div className={styles.spinner} /> : null

export default Spinner
