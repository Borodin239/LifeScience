import {makeStyles} from "@material-ui/core/styles";

const useMenuTabsStyles = makeStyles(() => ({
        main: {
            display: 'flex',
            flex: '1 1 0px',
            justifyContent: 'space-evenly',
            marginTop: '25px',
            marginBottom: '-6px'
        },
        tab: {
            flexGrow: 1,
            marginLeft: '-50px',
            padding: '5px',
            boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.5)',
            clipPath: 'inset(0px -40px 0px 0px)',
            borderRadius: '0px 20px 0px 0px',
            height: '2rem',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            ...["#2B337D", "#C2B778", "#E97679", "#BE75AC", "#666AB3"].reduce((acc, cur, i) => ({
                ...acc,
                [`&:nth-child(${i + 1})`]:
                    {
                        backgroundColor: cur,
                        marginLeft: i === 0 ? '0' : '-50px',
                        zIndex: 10 - i
                    }
            }), {})
        }
    }
))

export default useMenuTabsStyles;