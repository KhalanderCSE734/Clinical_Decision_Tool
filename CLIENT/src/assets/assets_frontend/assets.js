import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]


/*

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]


* */


export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Arjun Rao',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS, MD (General Medicine)',
        experience: '4 Years',
        about: 'Dr. Arjun Rao focuses on holistic care with emphasis on preventive healthcare, timely diagnosis, and practical treatments. His approach to medicine involves patient education and long-term wellness planning.',
        fees: 500,
        email: 'arjunrao@example.com',
        password: 'arjun123',
        address: {
            line1: 'MG Road',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Neha Patil',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics & Gynaecology)',
        experience: '3 Years',
        about: 'Dr. Neha Patil is known for her compassionate care in women’s health, and specializes in maternal wellness and gynecological procedures.',
        fees: 600,
        email: 'nehapatil@example.com',
        password: 'neha1234',
        address: {
            line1: 'Vinobanagar',
            line2: 'Shivamogga, Karnataka'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sahan Kulkarni',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, DDVL',
        experience: '1 Years',
        about: 'Dr. Sahana is a skilled dermatologist who emphasizes skincare solutions for both medical and cosmetic needs, particularly acne and pigmentation disorders.',
        fees: 400,
        email: 'sahankulkarni@example.com',
        password: 'sahan1234',
        address: {
            line1: 'Kuvempu Nagar',
            line2: 'Mysuru, Karnataka'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Karthik Shetty',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH',
        experience: '2 Years',
        about: 'Dr. Karthik provides attentive and child-friendly care, ensuring that every child receives the right nutrition, immunizations, and health checkups.',
        fees: 450,
        email: 'karthikshetty@example.com',
        password: 'karthik123',
        address: {
            line1: 'Bejai',
            line2: 'Mangaluru, Karnataka'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Anjali Deshmukh',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '4 Years',
        about: 'Dr. Anjali specializes in the diagnosis and treatment of brain and nerve-related conditions with a calm and methodical approach.',
        fees: 800,
        email: 'anjalideshmukh@example.com',
        password: 'anjali123',
        address: {
            line1: 'Deshpande Nagar',
            line2: 'Hubballi, Karnataka'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Vijay Hegde',
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Internal Medicine), DM (Gastroenterology)',
        experience: '4 Years',
        about: 'Dr. Vijay offers advanced care in digestive health and liver conditions using modern diagnostics and non-invasive treatments.',
        fees: 750,
        email: 'vijayhegde@example.com',
        password: 'vijay123',
        address: {
            line1: 'Sadashivnagar',
            line2: 'Belagavi, Karnataka'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Meer Nair',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Meera is a dedicated general practitioner providing primary care, routine health checkups, and lifestyle counseling to urban and rural communities.',
        fees: 500,
        email: 'meernair@example.com',
        password: 'meer1234',
        address: {
            line1: 'Rajaji Nagar',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Poojar Gowda',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO',
        experience: '3 Years',
        about: 'Dr. Poojar is passionate about women’s reproductive health and provides care during pregnancy, childbirth, and postpartum stages.',
        fees: 600,
        email: 'poojargowda@example.com',
        password: 'poojar123',
        address: {
            line1: 'Sarakari Layout',
            line2: 'Hassan, Karnataka'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Nisha Reddy',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '1 Years',
        about: 'Dr. Nisha brings a personalized approach to dermatology, focusing on chronic skin conditions and cosmetic concerns with a patient-first attitude.',
        fees: 400,
        email: 'nishareddy@example.com',
        password: 'nisha123',
        address: {
            line1: 'Ranebennur Main Road',
            line2: 'Haveri, Karnataka'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Rahul Nayak',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '2 Years',
        about: 'Dr. Rahul ensures your child’s health through effective immunization, developmental monitoring, and treatment of childhood illnesses.',
        fees: 500,
        email: 'rahulnayak@example.com',
        password: 'rahul123',
        address: {
            line1: 'Sector 2, Vijayanagar',
            line2: 'Davanagere, Karnataka'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Kavya Menon',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Medicine), DM (Neurology)',
        experience: '4 Years',
        about: 'Dr. Kavya offers consultations for headaches, seizures, strokes, and other neurological conditions with a focus on accurate diagnosis.',
        fees: 850,
        email: 'kavyamenon@example.com',
        password: 'kavya123',
        address: {
            line1: 'Nandini Layout',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Rajesh Naik',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DNB (Gastroenterology)',
        experience: '4 Years',
        about: 'Dr. Rajesh is committed to delivering end-to-end gastrointestinal care with endoscopic diagnostics and personalized treatment plans.',
        fees: 750,
        email: 'rajeshnaik@example.com',
        password: 'rajesh123',
        address: {
            line1: 'Vishweshwaraya Nagar',
            line2: 'Ballari, Karnataka'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Smita Bhatt',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS, PGDGM',
        experience: '4 Years',
        about: 'Dr. Smita offers friendly and approachable care in internal medicine, ensuring accurate diagnosis and long-term care plans.',
        fees: 450,
        email: 'smitabhatt@example.com',
        password: 'smita123',
        address: {
            line1: 'Jayanagar 5th Block',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Pranav Kulal',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS, MRCOG (UK)',
        experience: '3 Years',
        about: 'Dr. Pranav is known for evidence-based gynecological care and offers expert handling of high-risk pregnancies and women’s health concerns.',
        fees: 650,
        email: 'pranavkulal@example.com',
        password: 'pranav123',
        address: {
            line1: 'Karkala Main Road',
            line2: 'Udupi, Karnataka'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Ananya Shekar',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, DDVL',
        experience: '1 Years',
        about: 'Dr. Ananya’s clinical interest lies in treating eczema, psoriasis, and cosmetic dermatology with the latest technologies and skincare regimes.',
        fees: 400,
        email: 'ananyashekar@example.com',
        password: 'ananya123',
        address: {
            line1: 'Station Road',
            line2: 'Tumakuru, Karnataka'
        }
    }
];
