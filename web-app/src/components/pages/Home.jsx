import React from 'react'
import { createUseStyles } from 'react-jss'
import ttfGilroyBold from 'public/Gilroy-Bold.ttf'

import { range } from 'src/utilities'

const useStyles = createUseStyles({
  '@global': {
    '@font-face': {
      fontFamily: 'Gilrol-Bold',
      src: `url(${ttfGilroyBold}) format('truetype')`,
      fontStyle: 'normal',
    },
    '.hidden': {
      visibility: 'hidden',
    },
    '*': {
      boxSizing: 'border-box',
    }
  }
})

export default function Home() {
  const classes = useStyles()

  const count = range(5).map(it => (
    <li className={classes.listItem} key={it}>|</li>
  ))

  return (
    <ul>
      {count}
    </ul>
  )
}


