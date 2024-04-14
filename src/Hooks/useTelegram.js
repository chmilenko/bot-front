const tg = window.Telegram.WebApp;

export function ueTelegram () {

    const onClose = () => tg.close();

    const onToggleButton = () => {
        if(tg.MainButton.isVisible){
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }
    
    return {
        tg,
        user:  tg.initDataUnsafe.username,
        onClose,
        onToggleButton
    }
}