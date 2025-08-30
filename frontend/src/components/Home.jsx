
import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import useGetAlljons from '@/hooks/useGetAlljons'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    useGetAlljons()
  const {user} = useSelector(state=>state.auth)
  const nevigate = useNavigate()
  useEffect(() => {
    if(user?.role === "recruiter"){
      
       nevigate("/admin/companies")
    }
  }, [])

  
  return (
    <div>
      {}
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <CategoryCarousel></CategoryCarousel>
        <LatestJobs></LatestJobs>
        <Footer></Footer>
    </div>

  )
}

export default Home