import './App.css';
import { useState } from 'react';
//Spoiler
const Spoiler = ({ header = "+", open = true, children }) => {
  const [isOpen, setIsOpen] = useState(open)


  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {header}
      </div>
      {isOpen && children}
    </div>
  )
}

//RangeInput

const RangeInput = ({ min, max, ...props }) => {
  const [text, setText] = useState('test')


  return (
    <div>
      <h2>RangeInput</h2>
      <input
        type='text'
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          border: `1px solid ${text.length < min || text.length > max ? 'red' : 'black'}`
        }}
        {...props}
      ></input>
    </div>
  )
}

//LoginForm

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState('login')
  const [password, setPassword] = useState('1234')


  return (
    <div>
      <h2>LoginForm</h2>
      <input
        type='text'
        value={login}
        onChange={(e) => setLogin(e.target.value)}>
      </input>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}></input>
      <button
        onClick={() => (login !== '' && password !== '') ? onLogin(login, password) : console.log('Введіть логін та пароль')}
        disabled={!login || !password}>Login</button>
    </div>
  )
}

//PasswordConfirm

const PasswordConfirm = ({ min }) => {
  const [password, setPassword] = useState('1234')
  const [confirmPassword, setConfirmPassword] = useState('1234')
  const [passwordError, setPasswordError] = useState('')

  return (
    <div>
      <h2>PasswordConfirm</h2>
      <input
        type='password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          e.target.value < min ? setPasswordError(`Пароль повинен містити ${min} символи`) : setPasswordError('')
        }}></input>
      <input
        type='password'
        value={confirmPassword}
        placeholder='Підтвердіть пароль'
        onChange={e => {
          setConfirmPassword(e.target.value)
          e.target.value !== password ? setPasswordError('Паролі не співпадають') : setPasswordError('')
        }}>
      </input>
      {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
    </div>
  )
}

//Carousel

const Carousel = ({ images }) => {
  const [currentImgIndex, setCurrentTmgIndex] = useState(0)

  const goToNextImg = () => {
    setCurrentTmgIndex((prevIndex) => (prevIndex + 1) % images.length)
  }
  const goToPrevImg = () => {
    setCurrentTmgIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
  }
  const handleClickOnMainImage = (e) => {
    const { clientX, target } = e
    const { left, width } = target.getBoundingClientRect()
    const click = clientX - left
    if (click < width / 3) {
      goToPrevImg()
    } else {
      goToNextImg()
    }
  }
  return (
    <div className='container'>
      <h2>Carousel</h2>
      <div className='main-img' onClick={handleClickOnMainImage}>
        <img src={images[currentImgIndex]}></img>
      </div>
      <Thumbnails
        images={images}
        current={currentImgIndex}
        onChange={(key) => setCurrentTmgIndex(key)}></Thumbnails>
    </div>
  )
}

const Thumbnails = ({ images, current, onChange }) => {
  return (
    <div className='thumbnails-container'>
      {images.map((image, key) => (
        <img
          key={key}
          src={image}
          className={key === current ? 'active' : ''}
          onClick={() => onChange(key)}></img>
      ))}
    </div>
  )
}


//Pagination
const Pagination = ({ render: Render, max }) => {
  const [page, setPage] = useState(1)

  const handlePageChange = (newPage) => {
    setPage(Math.min(Math.max(newPage, 1), max))
  }

  return (
    <div>
      <h2>Pagination</h2>
      <Render page={page}></Render>
      <button onClick={() => handlePageChange(1)}>««</button>
      <button onClick={() => handlePageChange(page - 1)}>«</button>
      {Array.from({ length: max }, (_, index) => (
        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
      ))}
      <button onClick={() => handlePageChange(page + 1)}>»</button>
      <button onClick={() => handlePageChange(max)}>»»</button>
    </div>
  )
}
const Content = ({ page }) =>
  <div style={{ fontSize: '5em' }}>
    Сторінка №{page}
  </div>

const Color = ({ page }) =>
  <div style={{ color: `rgb(${page * 16},${page * 16},${page * 16})` }}>
    {page}
  </div>

function App() {
  return (
    <div className="App">
      <Spoiler header={<h1>Заголовок</h1>} open>
        Контент 1
        <p>
          лорем іпсум тралівалі і тп.
        </p>
      </Spoiler>


      <Spoiler>
        <h2>Контент 2</h2>
        <p>
          лорем іпсум тралівалі і тп.
        </p>
      </Spoiler>

      <RangeInput min={2} max={10} />

      <LoginForm onLogin={(login, password) => {
        console.log("Login", login);
        console.log("Password", password);
      }}></LoginForm>

      <PasswordConfirm min={2} />

      <Carousel images={["https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-1.jpg",
        "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-2.jpg",
        "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-3.jpg",
        "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-4.jpg",
        "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-5.jpg"]} />

      <Pagination max={10} render={Content} />
      <Pagination max={16} render={Color} />
    </div>
  );
}

export default App;
