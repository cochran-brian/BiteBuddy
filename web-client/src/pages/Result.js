

export default function Result() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <img src={require('../assets/biteLogo.png')} style={{width: "140%", height: 200, objectFit: 'cover'}}/>
            <div style={{fontFamily: 'Open Sans', fontSize: 28, color: '#111E30', marginTop: 30}}>
                You're All Set!
            </div>
            <div style={{fontFamily: 'Open Sans Medium', fontSize: 18, textAlign: 'center', width: "90%"}}>
                The host of the bite will receive your recomendations once everyone's ratings are in
            </div>
        </div>
    )
};