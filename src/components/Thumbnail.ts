import h from '../framework/h'

export default (imgSrc: String) => {
    return h('img', {src: imgSrc, class: 'thumbnail'})
}