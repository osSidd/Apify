import './footer.css'

export default function Footer(){
    return(
        <div className="footer">
            <div className="copyright">
                Copyright &copy; <a className='link' href="https://github.com/osSidd" target="_blank">osSidd</a> {new Date().getFullYear()}
            </div>
        </div>
    )
}