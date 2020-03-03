const compiler = require('vue-template-compiler')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(
  path.join(__dirname, 'resources/template.html'),
  { encoding: 'utf8' }
)

const generateCompilerModule = require('../../lib')

function generateRender(options) {
  const compilerModule = generateCompilerModule(options)

  const { render } = compiler.compile(template, {
    modules: [compilerModule],
  })

  return render
}

describe('Tests', () => {
  it('renders without test attribute when enabled', () => {
    const render = generateRender({
      enabled: true,
      attrs: ['test', 'e2e'],
    })

    expect(render).toEqual(
      expect.not.stringContaining(`"data-test":"paragraph"`)
    )
    console.log(render)

    expect(render).toEqual(expect.not.stringContaining(`"data-e2e":"div"`))
    expect(render).toEqual(expect.not.stringContaining(`"data-test":div-bound`))
    expect(render).toEqual(
      expect.not.stringContaining(`"data-test":div-bound-shorthand`)
    )
    expect(render).toMatchSnapshot()
  })
})
