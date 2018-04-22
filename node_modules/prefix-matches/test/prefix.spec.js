import test from 'ava'
import prefix from '../prefix'

test('returns an array', t => {
  t.true(Array.isArray(prefix('test', {})))
})

test('returns empty array if no matches', t => {
  t.is(prefix('w', { ignore: 'a' }).length, 0)
  t.is(prefix('a.b', { ignore: 'a', actual: { ignore: 'b' } }).length, 0)
})

test('returns correct property chain if result is object', t => {
  t.deepEqual(prefix('t.j', {
    test: {
      js: {
        default: 'test js',
        watch: 'test watch js'
      }
    }
  }), [{
    'test.js': {
      default: 'test js',
      watch: 'test watch js'
    }
  }])
})

test('resolves single prefixes', t => {
  t.deepEqual(prefix('w', { watch: 'a' }), [{ watch: 'a' }])
  t.deepEqual(prefix('w', { watch: 'a', wait: 'b' }), [{ watch: 'a' }, { wait: 'b' }])
  t.deepEqual(prefix('w', { watch: 'a', wait: 'b', ignore: 'c' }), [{ watch: 'a' }, { wait: 'b' }])
})

test('resolves nested prefixes', t => {
  t.deepEqual(prefix('w.j', {
    watch: {
      js: 'watch javascript',
      css: 'watch css'
    },
    write: {
      js: 'write javascript'
    }
  }), [{
    'watch.js': 'watch javascript'
  }, {
    'write.js': 'write javascript'
  }])
})

test('resolves _really_ nested prefixes', t => {
  t.deepEqual(prefix('b.f.j', {
    build: {
      frontend: {
        js: 'build javascript',
        css: 'build css'
      }
    }
  }), [{ 'build.frontend.js': 'build javascript' }])
})

test('does not flatten results', t => {
  t.deepEqual(prefix('w', {
    watch: {
      js: 'watch javascript',
      css: 'watch css'
    },
    build: 'build things'
  }), [{ watch: { js: 'watch javascript', css: 'watch css' } }])
})
