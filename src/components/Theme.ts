import h from '../framework/h'

export default (theme: String, day: number) => {
    const date = new Date()
    const today = date.getDate()
    const startDate = new Date(2020, 9,  1, 0, 0)
    const endDate   = new Date(2020, 10, 1, 0, 0)

    return h( 'p', 
    {
        class: 'theme ' + (
            date < startDate ? 'theme-future' :
            date > endDate   ? 'theme-past'   :
            day  > today     ? 'theme-future' :
            day  < today     ? 'theme-past'   :
                               'theme-present'
        ),
    },
    (day < 10 ? ('0' + day) : day) + ' – ' + theme
)}