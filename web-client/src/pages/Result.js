

export default function Result() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <img src={require('../assets/biteLogo.png')} style={{maxWidth: 800, marginTop: -120, marginBottom: -75}}/>
            <div style={{fontFamily: 'Open Sans', fontSize: 28, color: '#111E30'}}>
                You're All Set!
            </div>
            <div style={{fontFamily: 'Open Sans Medium', fontSize: 18, textAlign: 'center', width: 500}}>
                The host of the bite will receive your recomendations once everyone's ratings are in
            </div>
        </div>
    )
};