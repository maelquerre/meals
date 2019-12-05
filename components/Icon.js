function Icon(props) {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <use href={`~/feather-icons/dist/feather-sprite.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
