import React from 'react'
import { createUseStyles } from 'react-jss'
import MediaQuery, { useMediaQuery } from 'react-responsive'

import ttfGilroyBold from 'public/Gilroy-Bold.ttf'
import { range } from 'src/utilities'
import { DEVICE_SIZES } from 'src/config.json'

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
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  const count = range(5).map(it => (
    <li className={classes.listItem} key={it}>|</li>
  ))

  return (
    <>
      {isPortrait && <Lazy importItem={import('molecules/Desktop')} />}
      <MediaQuery query={DEVICE_SIZES.desktop}>
        <ul>
          {count}
        </ul>
      </MediaQuery>
    </>
  )
}


