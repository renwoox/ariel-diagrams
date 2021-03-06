/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('edge arrow', () => {
  test('one arrow', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100
        },
        {
          id: 'n2',
          width: 100,
          height: 100
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ],
          markers: [
            {
              id: '>',
              position: 'end'
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-arrow.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '275', height: '150' },
        ['defs', {},
          ['marker', { id: '>', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '25', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '150', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 125 75 L 150 75', stroke: 'black', 'marker-end': 'url(#>)', fill: 'none' }]
      ])
  })

  test('bidirectional arrows', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100
        },
        {
          id: 'n2',
          width: 100,
          height: 100
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ],
          markers: [
            {
              id: '<',
              position: 'start'
            },
            {
              id: '>',
              position: 'end'
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'bidirectional-arrows.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '275', height: '150' },
        ['defs', {},
          ['marker', { id: '<', markerWidth: '8', markerHeight: '6', refX: '0', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 3 L 8  6 L 8 0 Z' }]
          ],
          ['marker', { id: '>', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '25', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '150', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 125 75 L 150 75', stroke: 'black', 'marker-end': 'url(#>)', 'marker-start': 'url(#<)', fill: 'none' }]
      ])
  })

  test('two arrows', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100
        },
        {
          id: 'n2',
          width: 100,
          height: 100
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ],
          markers: [
            {
              id: '>',
              position: 'end'
            }
          ]
        },
        {
          id: 'e2',
          sources: [ 'n2' ],
          targets: [ 'n1' ],
          markers: [
            {
              id: '>',
              position: 'end'
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'two-arrows.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '275', height: '150' },
        ['defs', {},
          ['marker', { id: '>', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '150', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '25', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 150 91.66666666666666 L 125 91.66666666666666', stroke: 'black', 'marker-end': 'url(#>)', fill: 'none' }],
        ['path', { d: 'M 125 58.33333333333333 L 150 58.33333333333333', stroke: 'black', 'marker-end': 'url(#>)', fill: 'none' }]
      ])
  })
})
