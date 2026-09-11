import { Link } from './router.jsx'
import { expandCitationSpec, getCitation } from './citationsContent.jsx'

const CITE_BLOCK_RE = /(?:\[\d+(?:\s*[,\-–]\s*\d+)*\])+/g
const CITE_SINGLE_RE = /\[(\d+(?:\s*[,\-–]\s*\d+)*)\]/g

function citationNumsFromBlock(block) {
  const nums = []
  let match
  CITE_SINGLE_RE.lastIndex = 0
  while ((match = CITE_SINGLE_RE.exec(block)) !== null) {
    nums.push(...expandCitationSpec(match[1]))
  }
  return nums
}

function CiteRef({ num }) {
  const cite = getCitation(num)
  if (!cite) return <span className="cite-ref cite-ref-missing">[{num}]</span>
  return (
    <Link
      to={`/citations#${num}`}
      className="cite-ref"
      aria-label={`Reference ${num}: ${cite.title}`}
      title={cite.title}
    >
      {num}
    </Link>
  )
}

function CiteGroup({ nums, blockKey }) {
  return (
    <span className="cite-group">
      {nums.map((num, i) => (
        <span key={`${blockKey}-${num}`}>
          {i > 0 && <span className="cite-sep" aria-hidden="true">, </span>}
          <CiteRef num={num} />
        </span>
      ))}
    </span>
  )
}

/** Render a plain string with [1], [1,2], or [4][5] markers as superscript citation links. */
export function renderWithCitations(text) {
  if (typeof text !== 'string' || !text.includes('[')) return text

  const parts = []
  let last = 0
  let match

  CITE_BLOCK_RE.lastIndex = 0
  while ((match = CITE_BLOCK_RE.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const nums = citationNumsFromBlock(match[0])
    parts.push(<CiteGroup key={match.index} blockKey={match.index} nums={nums} />)
    last = match.index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 ? parts[0] : parts
}

export function Prose({ children, as: Tag = 'span', className }) {
  return <Tag className={className}>{renderWithCitations(children)}</Tag>
}

export function ProseP({ children, className, ...props }) {
  return (
    <p className={className} {...props}>
      <Prose>{children}</Prose>
    </p>
  )
}
