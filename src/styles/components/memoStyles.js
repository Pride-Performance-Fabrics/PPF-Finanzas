import { StyleSheet } from '@react-pdf/renderer';

export     const styles = StyleSheet.create({
    body: {
        paddingTop: 45 ,
        paddingBottom: 100,
        paddingHorizontal: '1in',
        display: 'flex',
        // flexDirection: 'column'
    },
    memoTitulo: {
        textAlign: 'right',
        marginLeft: 5,
        marginTop: 10,
        fontFamily: 'Times-Roman',
        // textAlign: 'center'
    },
    memoInfoRow: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left'
    },
    memoInfoValue: {
        // fontWeight: 'extrabold',
        fontSize: 14,
        fontFamily: 'Times-Roman',
        fontWeight: '800',
        textTransform: 'capitalize',
        maxWidth: '80%'
    },
    memoInfo: {
        fontSize: 14,
        // marginLeft: 12,
        fontFamily: 'Times-Roman',
        width: 50
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        // fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        // fontFamily: 'Oswald'
    },
    text: {
        // margin: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        // marginVertical: 15,
        // marginHorizontal: 100,
        width: '100%',
        // height: 200
        marginBottom: 30
    },
    imageFooter: {
        // marginVertical: 15,
        // marginHorizontal: 100,
        bottom: 30,
        position: 'absolute',
        left: 70,
        right: 0,
        width: '100%',
        // height: 200
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 80,
        left: 0,
        right: '1.1in',
        textAlign: 'right',
        color: 'grey',
    },
    firmaContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        width: '100%',
        marginTop: 30,
        flexWrap: 'wrap',
        // border: '1px solid #334422'
    },
    firmaItem: {
        width: '50%',
        // maxWidth: '50%',
        textAlign: 'center',
        // border: '1px solid #334422'
        // marginHorizontal: '3%'
    },
    imgFirma: {
        width: 150,
        height: 100,
        // border: '1px solid #ccc',
        margin: 'auto'
    },
    firmaNombre: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        fontWeight: '800',
        textTransform: 'capitalize',
        textAlign: 'center',
        width: '100%'
    },
    marcaAguaContainer: {
        position: 'absolute',
        top: 200
    },
    marcaAgua: {
        fontSize: 120,
        color: 'rgba(200,200,200,240)',
        transform: 'rotate(45deg)'
    }
});