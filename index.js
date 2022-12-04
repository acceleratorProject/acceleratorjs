#!/usr/bin/env node
import { init } from './src/init.js'

init().catch((e) => console.error(e))
