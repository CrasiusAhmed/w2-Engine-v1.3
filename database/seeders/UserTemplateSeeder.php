<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserTemplate; // adjust the namespace if needed
use App\Models\User; // assuming you want to attach the template to a user

class UserTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create();

        // Define the HTML content as a single string.
        $htmlContent = '
        <div class="hero">
            <div class="header">
                <h1 class="logo">Logo</h1>
                <ul class="nav">
                    <li>Home</li>
                    <li>Work</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div class="project-one">
                <div class="home-text">
                    <h1>Ai Payment Generation</h1>
                    <p>Our team of experts uses a methodology to identify the credit cards most likely to fit your needs.
                        we examine anual percentage rates, anual fees.
                    </p>
                    <div class="square2"></div>
                </div>
                <div class="home-img">
                    <div class="square"></div>
                    <div class="circle"></div>
                    <div class="circle2"></div>
                </div>
            </div>
        </div>

        <section>
            <div class="about">
                <div class="about-text">
                    <h1>Explore the Payment</h1>
                    <p>with the right credit card, you can earn rewards and saving money. with more hundreds of credit card</p>
                    <a href="#">Start Now</a>
                </div>

                <div class="about-pay">
                    <div class="display-pay">
                        <div class="icon">
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <div class="about-text">
                            <h3>Balance Transfer</h3>
                            <p>A balance transfer card can save you a lot of money</p>             
                        </div>
                    </div>
                    <div class="display-pay">
                        <div class="icon">
                            <ion-icon name="logo-paypal"></ion-icon>
                        </div>
                        <div class="about-text">
                            <h3>100% Safe</h3>
                            <p>we take steps make sure your information be secure</p>        
                        </div>
                    </div>
                    <div class="display-pay">
                        <div class="icon">
                            <ion-icon name="extension-puzzle-outline"></ion-icon>
                        </div>
                        <div class="about-text">
                            <h3>Rewards</h3>
                            <p>Earn little money by invite your friends to earn money</p>     
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="blog">
                <div class="first-box">
                    <div class="blog-box">
                        <div class="about-text">
                            <div class="square-blog"></div>
                            <h3>How to Create Square</h3>
                            <p>Learn How to create it fast</p>
                            <a href="#">Read Blog</a>
                        </div>
                    </div>

                    <div class="blog-box">
                        <div class="about-text">
                            <div class="circle-blog"></div>
                            <h3>How to Create Circle</h3>
                            <p>Learn How to create it fast</p>
                            <a href="#">Read Blog</a>
                        </div>
                    </div>

                    <div class="blog-box">
                        <div class="about-text">
                            <div class="circle-blog"></div>
                            <h3>How to Create Circle</h3>
                            <p>Learn How to create it fast</p>
                            <a href="#">Read Blog</a>
                        </div>
                    </div>

                    <div class="blog-box">
                        <div class="about-text">
                            <div class="square-blog"></div>
                            <h3>How to Create Square</h3>
                            <p>Learn How to create it fast</p>
                            <a href="#">Read Blog</a>
                        </div>
                    </div>
                </div>

                <div class="second-box">
                    <div class="about-text">
                        <h1>Find Blog That You Want And Read it.</h1>
                        <p>We have more than 50 pages blog that you can find what you want.</p>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="contact">
                <div class="about-text">
                    <h1>Contact Us We Have Every Support That You Need.</h1>
                    <p>We more then 50 support in this company and we ready to answer your question.</p>
                </div>
                <form>
                    <input type="text" placeholder="Enter Your Name">
                    <input type="email" placeholder="Enter Your Email">
                    <textarea cols="30" rows="10" placeholder="Enter Your Description"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>

        <section>
            <div class="footer">
                <div class="logo-text">
                    <h1>Logo</h1>
                    <p>A New way With Ai Payment</p>
                </div>

                <div class="flex-footer">
                    <div class="col">
                        <p>Useful Link</p>
                        <a href="#">Content</a>
                        <a href="#">Work</a>
                        <a href="#">Create</a>
                        <a href="#">Explore</a>
                        <a href="#">Terms & Services</a>
                    </div>
                    <div class="col">
                        <p>Community</p>
                        <a href="#">Help</a>
                        <a href="#">Partners</a>
                        <a href="#">Blog</a>
                        <a href="#">News</a>
                        <a href="#">Rewards</a>
                    </div>
                    <div class="col">
                        <p>Afflite</p>
                        <a href="#">Our Partner</a>
                        <a href="#">Become Partners</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="last">
            <div class="copyright">
                <div class="about-text">
                    <p>2023 Logo All Rights Reserved.</p>
                </div>
            </div>
        </section>

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        ';

        // Define the CSS content.
        // Note: Every selector is prefixed with "#preview-content " (except for @keyframes).
        $combinedCss = '
        #preview-content * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif, Helvetica, sans-serif;
        }
        .Body {
            color: #ebe6f1;
            background: #18171b;
        }
        #preview-content .hero {
            width: 100%;
            height: 100vh;
            position: relative;
        }
        #preview-content ::-webkit-scrollbar {
            width: 10px;
        }
        #preview-content ::-webkit-scrollbar-track {
            background: black;
            box-shadow: 25px 25px 75px rgba(0,0,0,0.25),
                        25px 25px 75px rgba(0,0,0,0.25),
                        inset 5px 5px 10px rgba(0,0,0,0.5),
                        inset 5px 5px 20px rgba(255,255,255,0.2),
                        inset -5px -5px 15px rgba(0,0,0,0.75);
        }
        #preview-content ::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: #e6e9f1;
        }
        #preview-content .header {
            padding: 40px 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }
        #preview-content .nav {
            display: flex;
            list-style-type: none;
        }
        #preview-content .logo {
            font-size: 2.5rem;
        }
        #preview-content h3 {
            font-size: 1.6rem;
            font-weight: 500;
            margin-bottom: 10px;
            line-height: 35px;
            max-width: 500px;
        }
        #preview-content h1 {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            letter-spacing: 2px;
            max-width: 500px;
        }
        #preview-content p {
            font-size: 1.3rem;
            font-weight: 400;
            margin-bottom: 35px;
            line-height: 35px;
            max-width: 500px;
        }
        #preview-content .nav li {
            color: #ebe6f1;
            text-decoration: none;
            padding: 10px 30px;
            margin: 0 10px;
            transition: .3s;
        }
        #preview-content .nav li:hover {
            color: #ebe6f1;
            box-shadow: 0px 0px 10px #e6e9f1, 
                        0px 0px 15px #00000079, 
                        inset 5px 0px 5px #e6e9f1, 
                        inset -5px -5px 5px rgba(247,247,247,0.5), 
                        inset 20px 10px 35px 10px rgba(0,0,0,0.4);
            border-radius: 20px;
        }
        #preview-content section {
            padding: 0 10% 170px 10%;
        }
        #preview-content .home-text h1 {
            font-size: 3.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            letter-spacing: 2px;
            max-width: 500px;
        }
        #preview-content .project-one {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            padding: 0 10%;
            position: absolute;
            width: 100%;
            top: 50%;
            height: 60%;
            left: 0;
            transform: translateY(-50%);
        }
        #preview-content .home-img {
            width: 100%;
            height: 100%;
            position: relative;
        }
        #preview-content .square {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 270px;
            height: 270px;
            background: #242930;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 15px;
            animation: kimi 8s linear infinite forwards;
            transition: .4s;
        }
        @keyframes kimi {
            0% {
                transform: translate(-50%, -50%) rotate(45deg);
                border-radius: 15px;
            }
            25% {
                transform: translate(-50%, -50%) rotate(85deg);
            }
            50% {
                transform: translate(-50%, -50%) rotate(120deg);
            }
            51% {
                transform: translate(-50%, -50%) rotate(150deg);
                border-radius: 50%;
            }
            75% {
                transform: translate(-50%, -50%) rotate(210deg);
                border-radius: 15px;
            }
            90% {
                transform: translate(-50%, -50%) rotate(0deg);
                border-radius: 50%;
            }
            100% {
                transform: translate(-50%, -50%) rotate(45deg);
                border-radius: 15px;
            }
        }
        #preview-content .circle {
            content: \'\';
            position: absolute;
            top: 28%;
            left: 86%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 100px;
            height: 100px;
            background: #242930;
            box-shadow: 0 0 0 rgba(0,0,0,0.5),
                        0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 50%;
            animation: kimi2 11s linear infinite forwards;
            transition: .4s;
        }
        #preview-content .circle2 {
            content: \'\';
            position: absolute;
            top: 72%;
            left: 6%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 60px;
            height: 60px;
            background: #242930;
            box-shadow: 0 0 0 rgba(0,0,0,0.5),
                        0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 50%;
            animation: kimi2 13s linear infinite forwards;
            transition: .4s;
        }
        #preview-content .square:hover,
        #preview-content .circle:hover,
        #preview-content .circle2:hover {
            background: #edfcff;
            box-shadow: 0 0 10px #e6e9f1, 
                        0 0 15px #00000079, 
                        inset 5px 0 5px #e6e9f1, 
                        inset -5px -5px 5px rgba(247,247,247,0.5), 
                        inset 20px 10px 35px 10px rgba(0,0,0,0.4);
        }
        @keyframes kimi2 {
            0% {
                transform: translate(-50%, -50%) rotate(45deg);
                border-radius: 50%;
            }
            25% {
                transform: translate(-50%, -100%) rotate(85deg);
            }
            50% {
                transform: translate(-50%, -90%) rotate(120deg);
            }
            51% {
                transform: translate(-50%, -85%) rotate(130deg);
                border-radius: 15px;
            }
            75% {
                transform: translate(-50%, -70%) rotate(210deg);
                border-radius: 50%;
            }
            90% {
                transform: translate(-50%, -60%) rotate(0deg);
                border-radius: 15px;
            }
            100% {
                transform: translate(-50%, -50%) rotate(45deg);
                border-radius: 50%;
            }
        }
        #preview-content .about {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            position: relative;
            gap: 50px;
        }
        #preview-content .about-pay {
            display: flex;
            flex-direction: column;
            gap: 50px;
        }
        #preview-content .display-pay {
            display: flex;
            align-items: center;
            gap: 50px;
            padding: 15px;
            position: relative;
        }
        #preview-content .icon {
            position: relative;
        }
        #preview-content .icon ion-icon {
            font-size: 2rem;
            color: #e6e9f1;
            padding: 10px;
            background: #242930;
            border-radius: 50%;
        }
        #preview-content .icon::before {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 80px;
            height: 80px;
            background: #242930;
            box-shadow: 0 0 0 rgba(0,0,0,0.5),
                        0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 15px;
            animation: kimi 12s linear infinite forwards;
            transition: .4s;
        }
        #preview-content .about-text a {
            font-size: 1.2rem;
            padding: 15px 25px;
            text-decoration: none;
            color: white;
            position: relative;
            z-index: 1;
            border-radius: 40px;
            background: transparent;
            box-shadow: 0 0 15px #ebe6f1c2, 
                        inset 0 0 7px #ebe6f1,
                        inset 0 0 9px #ebe6f1;
            border: 2px solid #ebe6f1c2;
            transition: .4s;
        }
        #preview-content .about-text a::before {
            content: \'\';
            position: absolute;
            top: 72%;
            left: 150%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 50px;
            height: 50px;
            background: #242930;
            box-shadow: 0 0 0 rgba(0,0,0,0.5),
                        0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 50%;
            animation: kimi2 13s linear infinite forwards;
            transition: .4s;
        }
        #preview-content .about-text a::after {
            content: \'\';
            position: absolute;
            top: 53%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 2px;
            background: #edfcff;
            box-shadow: 0 0 10px #e6e9f1, 
                        0 0 15px #00000079, 
                        inset 5px 0 5px #e6e9f1, 
                        inset -5px -5px 5px rgba(247,247,247,0.5), 
                        inset 20px 10px 35px 10px rgba(0,0,0,0.4);
            border-radius: 50%;
            transition: .4s;
        }
        #preview-content .about-text a:hover {
            border: 2px solid #edfcff;
            box-shadow: 0 0 10px #e6e9f1, 
                        0 0 15px #00000079, 
                        inset 5px 0 5px #e6e9f1, 
                        inset -5px -5px 5px rgba(247,247,247,0.5), 
                        inset 20px 10px 35px 10px rgba(0,0,0,0.4);
        }
        #preview-content .about-text a:hover::before {
            background: #edfcff;
            box-shadow: 0 0 10px #e6e9f1, 
                        0 0 15px #00000079, 
                        inset 5px 0 5px #e6e9f1, 
                        inset -5px -5px 5px rgba(247,247,247,0.5), 
                        inset 20px 10px 35px 10px rgba(0,0,0,0.4);
        }
        #preview-content .about-text a:hover::after {
            width: 225px;
            z-index: -1;
        }
        #preview-content .blog {
            padding: 170px 0;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            position: relative;
            gap: 50px;
        }
        #preview-content .first-box {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            position: relative;
            gap: 50px;
            row-gap: 150px;
        }
        #preview-content .about-text {
            float: right;
        }
        #preview-content .blog-box {
            width: 100%;
            height: 300px;
            text-align: center;
        }
        #preview-content .square-blog {
            content: \'\';
            width: 145px;
            height: 145px;
            background: #242930;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 15px;
            margin: 0 auto 30px;
            display: block;
        }
        #preview-content .circle-blog {
            content: \'\';
            width: 145px;
            height: 145px;
            background: #242930;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: block;
        }
        #preview-content .contact {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            gap: 50px;
        }
        #preview-content form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        #preview-content input {
            width: 300px;
            height: 50px;
            margin: 20px 0;
            background: #242930;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 15px;
            padding: 20px;
            border: 2px solid grey;
            color: #e6e9f1;
            transition: .4s;
        }
        #preview-content textarea {
            width: 300px;
            height: 270px;
            margin: 20px 0;
            background: #242930;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 15px;
            padding: 20px;
            border: 2px solid grey;
            color: #e6e9f1;
            transition: .4s;
        }
        #preview-content input:hover {
            width: 330px;
        }
        #preview-content input::placeholder {
            color: #ebe6f17c;
        }
        #preview-content textarea:hover {
            width: 350px;
        }
        #preview-content button {
            padding: 15px 25px;
            font-size: 1.2rem;
            color: white;
            position: relative;
            z-index: 1;
            border-radius: 40px;
            background: transparent;
            box-shadow: 0 0 15px #ebe6f1c2, 
                        inset 0 0 7px #ebe6f1,
                        inset 0 0 9px #ebe6f1;
            border: 2px solid #ebe6f1c2;
            width: 200px;
            cursor: pointer;
            transition: .4s;
        }
        #preview-content button::before {
            content: \'\';
            position: absolute;
            top: 53%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 2px;
            background: #ffffff;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 50%;
            transition: .4s;
        }
        #preview-content button:hover {
            width: 240px;
            border: 2px solid #e6e9f1;
            box-shadow: 0 0 15px #ebe6f1c2, 
                        inset 0 0 7px #ebe6f1c2,
                        inset 0 0 9px rgba(0,0,0,0.7);
        }
        #preview-content button:hover::before {
            width: 300px;
        }
        #preview-content .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 120px;
        }
        #preview-content .flex-footer {
            display: flex;
        }
        #preview-content .col {
            display: flex;
            flex-direction: column;
            margin: 0 75px;
        }
        #preview-content .col a {
            color: #ebe6f1c0;
            margin-bottom: 10px;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 400;
            transition: .4s;
            position: relative;
        }
        #preview-content .col a:hover {
            color: #edfcff;
        }
        #preview-content .col a::after {
            content: \'\';
            position: absolute;
            top: 72%;
            left: -28%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 20px;
            height: 20px;
            background: #242930;
            box-shadow: 0 0 0 rgba(0,0,0,0.5), 
                        0 0 5px #ebe6f17c, 
                        inset 5px 0 5px #ebe6f1,
                        inset -5px -5px 5px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border-radius: 15px;
            animation: kimi2 8s linear infinite forwards;
            transition: .4s;
        }
        #preview-content .col a:hover::after {
            background: #edfcff;
            box-shadow: 0 0 10px #e6e9f1, 
                        0 0 15px #00000079, 
                        inset 5px 0 5px #e6e9f1, 
                        inset -5px -5px 5px rgba(247,247,247,0.5), 
                        inset 20px 10px 35px 10px rgba(0,0,0,0.4);
        }
        #preview-content .last {
            padding: 0 10%;
        }
        #preview-content .copyright {
            display: flex;
            position: relative;
        }
        #preview-content .copyright::before {
            content: \'\';
            position: absolute;
            top: -50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 2px;
            background: #ffffff;
            box-shadow: 0 0 15px #ebe6f17c, 
                        inset 5px 0 10px #ebe6f1,
                        inset -5px -5px 10px rgba(0,0,0,0.5), 
                        inset 30px 10px 35px 10px rgba(255,255,255,0.2);
            border-radius: 50%;
            transition: .4s;
        }
        ';

        // Now create your user template record using the new content.
        UserTemplate::create([
            'user_id'       => $user->id,
            'project_name'  => 'Project 1',
            'html_content'  => $htmlContent,
            'css_content'   => $combinedCss,
            'hover_css'     => '',
            'keyframe_css'  => '',
            'media_queries' => '',
            'select_unit'   => '',
            'background_data' => '',
            'box_shadows'   => '',
            'text_shadows'  => '',
            'is_custom'     => true,
        ]);









        // Define the new HTML content for Custom Project 2.
        $htmlContent2 = '
        <div class="hero">
            <div class="header">
                <h1 class="logo">Lo<span>Go</span></h1>
                <ul class="nav">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Buy</a></li>
                </ul>
            </div>

            <div class="box-grid">
                <div class="title">
                    <h1><span>Ai</span> Payment Generation</h1>
                    <p>Our team of experts uses a methodology to identify the credit cards most likely to fit your needs.
                        we examine anual percentage rates, anual fees.</p>
                </div>
                <div class="home-circle">
                    <div class="center">
                        <div class="aisa1"></div>
                        <div class="aisa2"></div>
                        <div class="aisa3"></div>
                        <div class="aisa4"></div>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div class="about">
                <div class="text-center">
                    <h1>Explore The Payment</h1>
                    <p>with the right credit card, you can earn rewards and saving money. with our Ai system easy as that just try it and make your future</p>
                </div>

                <div class="grid-flex">
                    <div class="about-rim">
                        <div class="rim">
                            <div class="text">
                                <h3>Bitcoin</h3>
                                <p>Grow your business and buy for future</p>
                            </div>
                            <div class="icon">
                                <ion-icon name="logo-bitcoin"></ion-icon>
                            </div>
                        </div>
                        <div class="rim">
                            <div class="text">
                                <h3>Android</h3>
                                <p>Get news from our Developer everyday</p>
                            </div>
                            <div class="icon">
                                <ion-icon name="logo-android"></ion-icon>
                            </div>
                        </div>
                        <div class="rim">
                            <div class="text">
                                <h3>Dollars</h3>
                                <p>Time to create new future for you and family</p>
                            </div>
                            <div class="icon">
                                <ion-icon name="logo-usd"></ion-icon>
                            </div>
                        </div>
                    </div>

                    <div class="second">
                        <div class="center2">
                            <div class="aisa1"></div>
                            <div class="aisa2"></div>
                            <div class="aisa3"></div>
                            <div class="aisa4"></div>
                        </div>
                    </div>

                    <div class="about-rim">
                        <div class="rim">
                            <div class="icon">
                                <ion-icon name="star-outline"></ion-icon>
                            </div>
                            <div class="text">
                                <h3>Balance Transfer</h3>
                                <p>A balance transfer card can save you a lot of money</p>
                            </div>
                        </div>
                        <div class="rim">
                            <div class="icon">
                                <ion-icon name="logo-paypal"></ion-icon>
                            </div>
                            <div class="text">
                                <h3>100% Safe</h3>
                                <p>we take steps make sure your information be secure</p>
                            </div>
                        </div>
                        <div class="rim">
                            <div class="icon">
                                <ion-icon name="extension-puzzle-outline"></ion-icon>
                            </div>
                            <div class="text">
                                <h3>Rewards</h3>
                                <p>Earn little money by invite your friends to earn money</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="work">
                <div class="text">
                    <h1>Compare offers and <span>buy</span> crypto instantly</h1>
                    <p>See real-time Bitcoin and altcoin prices then buy cryptocurrency with a credit card or other options.</p>
                    <a href="#">Check Out</a>
                </div>
                <div class="third">
                    <div class="center3">
                        <div class="f1-circle"></div>
                        <div class="f2-circle"></div>
                        <div class="f3-circle"></div>
                        <div class="square"></div>
                        <div class="circle"></div>
                        <div class="circle2"></div>
                    </div>

                    <div class="box1">
                        <div class="icon">
                            <ion-icon name="logo-paypal"></ion-icon>
                        </div>
                        <h1>Wallet transition safe</h1>
                        <p>Ai can support you now to send your money</p>
                    </div>

                    <div class="box-on1">
                        <div class="icon">
                            <ion-icon name="logo-bitcoin"></ion-icon>
                        </div>
                        <h1>Wallet transition safe</h1>
                        <p>Ai can support you now to send your money</p>
                    </div>

                    <div class="box2">
                        <div class="box-space">
                            <h1>Online Analysis</h1>
                            <p>Today Now</p> 
                        </div>
                        <div class="box-space2">
                            <h1>$26,841.90</h1>
                            <p><span>12:25 UTC</span></p>
                        </div>
                        <div class="box-space2">
                            <p style="color: #d12222;">−17.20 (0.06%)</p> 
                            <p>Expenses</p> 
                        </div>
                        <div class="box-space3">
                            <div class="icon2">
                                <ion-icon name="logo-usd"></ion-icon>
                            </div>
                        </div>
                    </div>

                    <div class="box-on2">
                        <div class="box-space">
                            <h1>Online Analysis</h1>
                            <p>Today Now</p> 
                        </div>
                        <div class="box-space2">
                            <h1>$26,841.90</h1>
                            <p><span>12:25 UTC</span></p>
                        </div>
                        <div class="box-space2">
                            <p style="color: #d12222;">−17.20 (0.06%)</p> 
                            <p>Expenses</p> 
                        </div>
                        <div class="box-space3">
                            <div class="icon2">
                                <ion-icon name="logo-bitcoin"></ion-icon>
                            </div>
                        </div>
                    </div>

                    <div class="box3">
                        <h1>Pay Method</h1>
                        <div class="icon2">
                            <ion-icon name="logo-paypal"></ion-icon>
                            <ion-icon name="logo-bitcoin"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="extension-puzzle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="text-center">
                <h1>Choose the best crypto wallet and find crypto safety tips to get started with cryptocurrency.</h1>
            </div>
            <div class="buy">
                <div class="card1">
                    <div class="text-center">
                        <h3>Buy Dollar</h3>
                        <p>See Price of Dollar Today And Get Ready To Buy It</p>
                    </div>
                    <div class="icon-center">
                        <ion-icon name="logo-usd"></ion-icon>
                    </div>
                    <div class="center-card">
                        <div class="aisa1"></div>
                        <div class="aisa2"></div>
                        <div class="aisa3"></div>
                        <div class="aisa4"></div>
                    </div>
                    <div class="center-card-hover">
                        <div class="aisa1"></div>
                        <div class="aisa2"></div>
                        <div class="aisa3"></div>
                        <div class="aisa4"></div>
                    </div>
                </div>

                <div class="card2">
                    <div class="text-center">
                        <h3>Buy Bitcoin</h3>
                        <p>See Price of Bitcoin Today And Get Ready To Buy It</p>
                    </div>
                    <div class="icon-center2">
                        <ion-icon name="logo-bitcoin"></ion-icon>
                    </div>
                    <div class="center-card2">
                        <div class="aisa1"></div>
                        <div class="aisa2"></div>
                        <div class="aisa3"></div>
                        <div class="aisa4"></div>
                    </div>
                    <div class="center-card-hover2">
                        <div class="aisa1"></div>
                        <div class="aisa2"></div>
                        <div class="aisa3"></div>
                        <div class="aisa4"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-footer">
            <div class="last-center">
                <div class="center">
                    <div class="aisa1"></div>
                    <div class="aisa2"></div>
                    <div class="aisa3"></div>
                    <div class="aisa4"></div>
                </div>
            </div>
            <div class="footer">
                <div class="logo-text">
                    <h1>Logo</h1>
                    <p>A New Way With Ai Payment</p>
                </div>
                <div class="flex-footer">
                    <div class="col">
                        <p>Useful Link</p>
                        <a href="#">Content</a>
                        <a href="#">Work</a>
                        <a href="#">Create</a>
                        <a href="#">Explore</a>
                        <a href="#">Terms & Services</a>
                    </div>
                    <div class="col">
                        <p>Community</p>
                        <a href="#">Help</a>
                        <a href="#">Partners</a>
                        <a href="#">Blog</a>
                        <a href="#">News</a>
                        <a href="#">Rewards</a>
                    </div>
                    <div class="col">
                        <p>Afflite</p>
                        <a href="#">Our Partner</a>
                        <a href="#">Become Partners</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="last">
            <div class="copyright">
                <div class="text">
                    <p>2023 Logo All Rights Reserved.</p>
                </div>
            </div>
        </section>

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        ';

        // Define the new CSS content and prefix every selector with "#preview-content " (except for @keyframes).
        $combinedCss2 = '


        #preview-content *
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif, Helvetica, sans-serif;
        }

        .Body
        {
            color: ghostwhite;
            background: #030c09;
            width: 100%;
            position: relative;
            overflow-x: hidden;
        }

        #preview-content::-webkit-scrollbar
        {
            width: 10px;
        }
        #preview-content::-webkit-scrollbar-track
        {
            background: black;
            box-shadow: 25px 25px 75px rgba(0,0,0,0.25),
            25px 25px 75px rgba(0,0,0,0.25),
            inset 5px 5px 10px rgba(0,0,0,0.5),
            inset 5px 5px 20px rgba(255,255,255,0.2),
            inset -5px -5px 15px rgba(0,0,0,0.75);
        }
        #preview-content::-webkit-scrollbar-thumb
        {
            border-radius: 5px;
            background: #e6e9f1;
        }

        #preview-content .hero
        {
            width: 100%;
            height: 100vh;
            position: relative;
        }
        #preview-content .hero::before
        {
            content: \'\';
            position: absolute;
            top: -4%;
            left: 18%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 350px;
            height: 350px;
            background: #0bda67;
            border-radius: 50%;
            filter: blur(100px);
        }

        #preview-content .header
        {
            padding: 40px 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #preview-content .nav
        {
            display: flex;
            list-style-type: none;
        }

        #preview-content .nav li a
        {
            color: ghostwhite;
            text-decoration: none;
            padding: 10px 30px;
            margin: 0px 10px;
            transition: .4s;
        }

        #preview-content .nav li a:hover
        {
            color: ghostwhite;
            box-shadow: 0px 0px 10px #23ff8f79,
            0px 0px 5px #23ff8f79,
            inset 3px 0px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 10px 10px 10px 5px rgba(255,255,255,0.2);
            border-radius: 20px;
        }

        #preview-content .logo
        {
            font-size: 2.5rem;
        }
        #preview-content span
        {
            color: #0bda8a;
        }
        #preview-content h3
        {
            font-size: 1.6rem;
            font-weight: 500;
            margin-bottom: 10px;
            line-height: 35px;
            max-width: 500px;
        }
        #preview-content h1
        {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            letter-spacing: 2px;
            max-width: 500px;
        }
        #preview-content p
        {
            font-size: 1.3rem;
            font-weight: 400;
            margin-bottom: 35px;
            line-height: 35px;
            max-width: 500px;
        }
        #preview-content .text-center h3,
        #preview-content .text-center h1,
        #preview-content .text-center p
        {
            max-width: none;
            text-align: center;
            padding: 10px 20px;
        }
        #preview-content section
        {
            padding: 0px 10% 170px 10%;
        }

        #preview-content .title h1
        {
            font-size: 3.5rem;
        }

        #preview-content .box-grid
        {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            position: absolute;
            width: 100%;
            height: 60%;
            top: 50%;
            left: 0%;
            padding: 0px 10%;
            transform: translateY(-50%);
        }

        #preview-content .home-circle
        {
            width: 100%;
            height: 100%;
            position: relative;
        }
        #preview-content .home-circle::before
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 300px;
            height: 300px;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 5px 0px 5px #0bda67,
            inset 5px 0px 10px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
        }


        #preview-content .center
        {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transform: translate(-50%, -50%) rotate(45deg);
            width: 72%;
            height: 85%;
            animation: roti 20s linear forwards infinite;
        }

        @keyframes roti
        {
            0%
            {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100%
            {
                transform: translate(-50%, -50%) rotate(-360deg);
            }
        }

        #preview-content .aisa1
        {
            transform: rotate(288deg);
            width: 100%;
            height: 100%;
        }
        #preview-content .aisa1::before
        {
            content: \'\';
            width: 67%;
            height: 67%;
            position: absolute;
            top: 14%;
            left: 24%;
            transform: translate(-50%, -50%);
            border-top: 4px solid #0bda67;
            border-top-left-radius: 480px;
            z-index: -1;
        }
        #preview-content .aisa1::after
        {
            content: \'\';
            width: 64%;
            height: 72%;
            position: absolute;
            top: 78%;
            left: 93%;
            transform: translate(-50%, -50%);
            border-bottom: 4px solid #0bda67;
            border-bottom-right-radius: 480px;
            z-index: -1;
        }


        #preview-content .aisa2
        {
            width: 85%;
            height: 85%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(14deg);
        }
        #preview-content .aisa2::before
        {
            content: \'\';
            width: 90%;
            height: 90%;
            position: absolute;
            top: 84%;
            left: 91%;
            transform: translate(-50%, -50%);
            border-bottom: 4px solid #0bda67;
            border-bottom-right-radius: 480px;
            z-index: -1;
        }
        #preview-content .aisa2::after
        {
            content: \'\';
            width: 67%;
            height: 67%;
            position: absolute;
            top: 16%;
            left: 21%;
            transform: translate(-50%, -50%);
            border-top: 4px solid #0bda67;
            border-top-left-radius: 480px;
            z-index: -1;
        }

        #preview-content .aisa3
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 47%;
            left: 47%;
            transform: translate(-50%, -50%) rotate(64deg) scale(0.8);
        }
        #preview-content .aisa3::before
        {
            content: \'\';
            width: 67%;
            height: 67%;
            position: absolute;
            top: 76%;
            left: 82%;
            transform: translate(-50%, -50%);
            border-bottom: 4px solid #0bda67;
            border-bottom-right-radius: 480px;
            z-index: -1;
        }
        #preview-content .aisa3::after
        {
            content: \'\';
            width: 37%;
            height: 37%;
            position: absolute;
            top: 3%;
            left: 30%;
            transform: translate(-50%, -50%);
            border-top: 4px solid #0bda67;
            border-top-left-radius: 480px;
            z-index: -1;
        }


        #preview-content .aisa4
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 43%;
            left: 49%;
            transform: translate(-50%, -50%) rotate(152deg) scale(0.6);
        }
        #preview-content .aisa4::before
        {
            content: \'\';
            width: 67%;
            height: 67%;
            position: absolute;
            top: 76%;
            left: 82%;
            transform: translate(-50%, -50%);
            border-bottom: 4px solid #0bda67;
            border-bottom-right-radius: 480px;
            z-index: -1;
        }
        #preview-content .aisa4::after
        {
            content: \'\';
            width: 67%;
            height: 67%;
            position: absolute;
            top: 16%;
            left: 21%;
            transform: translate(-50%, -50%);
            border-top: 4px solid #0bda67;
            border-top-left-radius: 480px;
            z-index: -1;
        }

        #preview-content .about
        {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            align-items: center;
            position: relative;
            grid-gap: 100px;
            text-align: center;
        }
        #preview-content .about::before
        {
            content: \'\';
            position: absolute;
            top: 121%;
            left: -8%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 300px;
            height: 300px;
            background: #0bda67;
            border-radius: 50%;
            filter: blur(150px);
            z-index: -5;
        }

        #preview-content .about-rim
        {
            display: flex;
            flex-direction: column;
            grid-gap: 50px;
            flex: 120%;
        }
        #preview-content .grid-flex
        {
            display: flex;
            grid-gap: 20px;
            align-items: center;
        }
        #preview-content .second
        {
            content: \'\';
            position: relative;
            width: 100%;
            height: 700px;
            z-index: -1;
        }

        #preview-content .second::before
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 150px;
            height: 150px;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 5px 0px 5px #0bda67,
            inset 5px 0px 10px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
        }
        #preview-content .center2
        {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 52%;
            height: 46%;
            animation: roti 20s linear forwards infinite;
        }
        #preview-content .rim
        {
            display: flex;
            align-items: center;
            grid-gap: 50px;
            position: relative;
            padding: 15px;
        }
        #preview-content .icon,
        #preview-content .icon2
        {
            position: relative;
        }
        #preview-content .icon ion-icon
        {
            font-size: 2.0rem;
            border-radius: 50%;
            color: ghostwhite;
            padding: 15px;
            box-shadow: 0px 0px 10px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 0px 0px 0px 0px #0bda67,
            inset 0px 0px 5px 0px #0bda67,
            inset 18px 8px 100px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border: 1px solid #a2cbd7;
        }
        #preview-content .icon::before
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 100px;
            height: 100px;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 2px 0px 0px 1px #0bda67,
            inset 5px 5px 10px rgba(0,0,0,0.8),
            inset 5px 5px 20px rgba(0,0,0,0.2);
            border-radius: 15px;
        }

        #preview-content .work
        {
            padding: 170px 0%;
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            grid-gap: 50px;
        }
        #preview-content .third
        {
            width: 500px;
            height: 500px;
            position: relative;
        }

        #preview-content .f1-circle
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            border: 12px solid #0bda67;
            border-radius: 50%;
            content: \'\';
            z-index: -1;
        }
        #preview-content .f2-circle
        {
            width: 70%;
            height: 70%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            border: 9px solid #0bda67;
            border-radius: 50%;
            content: \'\';
            z-index: -1;
        }

        #preview-content .f1-circle::before,
        #preview-content .f2-circle::before
        {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            border: 6px solid #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 2px 0px 0px 1px #0bda67,
            inset 5px 5px 10px rgba(0,0,0,0.8),
            inset 5px 5px 20px rgba(0,0,0,0.2);
            border-radius: 50%;
            content: \'\';
            z-index: -1;
        }

        #preview-content .f3-circle
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 40%;
            height: 40%;
            box-shadow: 0px 0px 10px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 5px 0px 5px #0bda67,
            inset 5px 0px 10px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
            z-index: -1;
        }

        #preview-content .square
        {
            content: \'\';
            position: absolute;
            top: 46%;
            left: 9%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 30px;
            height: 30px;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 3px 0px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 10px 10px 10px 5px rgba(255,255,255,0.2);
            border-radius: 5px;
            z-index: -1;
        }
        #preview-content .circle
        {
            content: \'\';
            position: absolute;
            top: 79%;
            left: 102%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 50px;
            height: 50px;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 3px 0px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 10px 10px 10px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
            z-index: -1;
        }
        #preview-content .circle
        {
            content: \'\';
            position: absolute;
            top: 8%;
            left: 59%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 20px;
            height: 20px;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 3px 0px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 10px 10px 10px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
            z-index: -1;
        }

        #preview-content .box1
        {
            width: 300px;
            height: 200px;
            text-align: center;
            background: #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 1px 0px 0px 0px #0bda67,
            inset 13px 20px 10px rgba(0,0,0,0.8),
            inset -20px -19px 20px rgba(0,0,0,0.2);
            border-radius: 30px;
            position: absolute;
            top: 12%;
            left: -26%;
            animation: opa1 10s ease forwards infinite;
        } 
        #preview-content .box-on1
        {
            width: 300px;
            height: 200px;
            text-align: center;
            background: #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 1px 0px 0px 0px #0bda67,
            inset 13px 20px 10px rgba(0,0,0,0.8),
            inset -20px -19px 20px rgba(0,0,0,0.2);
            border-radius: 30px;
            position: absolute;
            top: 36%;
            left: -26%;
            opacity: 0;
            animation: opa2 10s ease-in forwards infinite;
        } 


        #preview-content .box2
        {
            width: 300px;
            height: 300px;
            text-align: center;
            background: #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 1px 0px 0px 0px #0bda67,
            inset 13px 20px 10px rgba(0,0,0,0.8),
            inset -20px -19px 20px rgba(0,0,0,0.2);
            border-radius: 30px;
            position: absolute;
            top: 5%;
            left: 50%;
            animation: opa1 10s ease forwards infinite;
        } 
        #preview-content .box-on2
        {
            width: 300px;
            height: 300px;
            text-align: center;
            background: #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 1px 0px 0px 0px #0bda67,
            inset 13px 20px 10px rgba(0,0,0,0.8),
            inset -20px -19px 20px rgba(0,0,0,0.2);
            border-radius: 30px;
            position: absolute;
            top: -22%;
            left: 32%;
            opacity: 0;
            animation: opa2 10s ease-in forwards infinite;
        } 

        @keyframes opa1
        {
            0%
            {
                opacity: 1;
            }
            50%
            {
                opacity: 1;
            }
            51%
            {
                opacity: 0;
            }
            99%
            {
                opacity: 0;
            }
            100%
            {
                opacity: 1;
            }
        }
        @keyframes opa2
        {
            0%
            {
                opacity: 0;
            }
            50%
            {
                opacity: 0;
            }
            51%
            {
                opacity: 1;
            }
            99%
            {
                opacity: 1;
            }
            100%
            {
                opacity: 0;
            }
        }
        #preview-content .box3
        {
            width: 300px;
            height: 100px;
            text-align: center;
            background: #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            inset 1px 0px 0px 0px #0bda67,
            inset 13px 20px 10px rgba(0,0,0,0.8),
            inset -20px -19px 20px rgba(0,0,0,0.2);
            border-radius: 30px;
            position: absolute;
            top: 80%;
            left: 9%;
        } 

        #preview-content .box-space
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px;
        }
        #preview-content .box-space2
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0px 20px;
        }
        #preview-content .box-space3
        {
            transform: translateY(40px) scale(1.5);
        }


        #preview-content .box1 h1,
        #preview-content .box-on1 h1
        {
            font-size: 1.0rem;
            font-weight: 600;
            margin-top: 40px;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }
        #preview-content .box2 h1,
        #preview-content .box-on2 h1
        {
            font-size: 1.0rem;
            font-weight: 600;
            letter-spacing: 2px;
        }
        #preview-content .box3 h1
        {
            font-size: 1.0rem;
            font-weight: 600;
            margin-bottom: 15px;
            letter-spacing: 2px;
        }
        #preview-content .box2 p,
        #preview-content .box-on2 p
        {
            font-size: 0.8rem;
            font-weight: 400;
            margin-bottom: 0px;
        }
        #preview-content .box1 p,
        #preview-content .box-on1 p,
        #preview-content .box3 p
        {
            font-size: 0.8rem;
            font-weight: 400;
            margin-bottom: 35px;
            line-height: 35px;
        }
        #preview-content .icon2 ion-icon
        {
            font-size: 1.5rem;
            border-radius: 50%;
            color: ghostwhite;
            padding: 10px;
            box-shadow: 0px 0px 10px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 0px 0px 0px 0px #0bda67,
            inset 0px 0px 5px 0px #0bda67,
            inset 18px 8px 100px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border: 1px solid #a2cbd7;
            margin: 0px 5px;
        }

        #preview-content .text a
        {
            padding: 15px 25px;
            font-size: 1.2rem;
            text-decoration: none;
            color: ghostwhite;
            position: relative;
            z-index: 1;
            border-radius: 40px;
            background: #030c09;
            box-shadow: 0px 0px 10px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 0px 0px 3px 0px #0bda67,
            inset 0px 0px 5px 0px #0bda67,
            inset 18px 8px 100px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            transition: .4s;
        }
        #preview-content .text a:hover
        {
            box-shadow: 0px 0px 30px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 0px 0px 0px 1px #0bda67,
            inset 0px 0px 5px 2px #0bda67,
            inset 18px 8px 100px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
        }
        #preview-content .text a::after
        {
            content: \'\';
            position: absolute;
            top: 53%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 2px;
            background: #033f1e;
            box-shadow: 0px 0px 10px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 0px 0px 3px 0px #0bda67,
            inset 0px 0px 5px 0px #0bda67,
            inset 18px 8px 100px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            transition: .4s;
        }
        #preview-content .text a:hover::after
        {
            width: 225px;
        }


        #preview-content .buy
        {
            padding-top: 100px;
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            grid-gap: 50px;
        }

        #preview-content .card1
        {
            position: relative;
            width: 400px;
            height: 500px;
            background: #00120d;
            box-shadow: 0px 0px 30px #23f5ff4d,
            inset 3px 0px 0px 1px #0bdaa1,
            inset 5px 5px 10px rgba(0,0,0,0.8),
            inset 5px 5px 20px rgba(0,0,0,0.2);
            margin: 0 auto;
            display: block;
            overflow: hidden;
            border-radius: 30px;
            transition: .4s ease-out .1s;
            z-index: 1;
        }

        #preview-content .card2
        {
            position: relative;
            width: 400px;
            height: 500px;
            background: #090010;
            box-shadow: 0px 0px 30px #bf23ff4d,
            inset 3px 0px 0px 1px #cb86ff,
            inset 5px 5px 10px rgba(0,0,0,0.8),
            inset 5px 5px 20px rgba(0,0,0,0.2);
            margin: 0 auto;
            display: block;
            overflow: hidden;
            border-radius: 30px;
            transition: .4s ease-out .1s;
            z-index: 1;
        }

        #preview-content .center-card
        {
            position: absolute;
            top: 72%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            height: 65%;
            filter: hue-rotate(20deg);
            transition: .6s cubic-bezier(0.71, 0.02, 0.06, 1.01) 0.1s;
            animation: roti 20s linear reverse infinite;
        }

        #preview-content .center-card-hover
        {
            position: absolute;
            top: 72%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            height: 65%;
            filter: hue-rotate(20deg);
            transition: .6s cubic-bezier(0.71, 0.02, 0.06, 1.01) 0.1s;
            animation: roti 5s linear reverse infinite;
            opacity: 0;
        }

        #preview-content .center-card2
        {
            position: absolute;
            top: 72%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            height: 65%;
            filter: hue-rotate(110deg);
            transition: .6s cubic-bezier(0.71, 0.02, 0.06, 1.01) 0.1s;
            animation: roti 20s linear forwards infinite;
        }

        #preview-content .center-card-hover2
        {
            position: absolute;
            top: 72%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            height: 65%;
            filter: hue-rotate(110deg);
            transition: .6s cubic-bezier(0.71, 0.02, 0.06, 1.01) 0.1s;
            animation: roti 5s linear forwards infinite;
            opacity: 0;
        }

        #preview-content .icon-center,
        #preview-content .icon-center2
        {
            position: absolute;
            top: 72%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: .4s ease-out .2s;
        }
        #preview-content .icon-center ion-icon
        {
            font-size: 2.0rem;
            border-radius: 50%;
            color: ghostwhite;
            padding: 20px;
            box-shadow: 0px 0px 30px #23f5ff4d,
            inset 2px 0px 0px 1px #0bdaa1,
            inset 5px 5px 10px rgba(0,0,0,0.8),
            inset 5px 5px 20px rgba(0,0,0,0.2);
        }
        #preview-content .icon-center2 ion-icon
        {
            font-size: 2.0rem;
            border-radius: 50%;
            color: ghostwhite;
            padding: 20px;
            box-shadow: 0px 0px 30px #bf23ff4d,
            inset 3px 0px 0px 1px #cb86ff,
            inset 5px 5px 10px rgba(0,0,0,0.8),
            inset 5px 5px 20px rgba(0,0,0,0.2);
            border: 1px solid #a2cbd7;
        }


        #preview-content .card1:hover,
        #preview-content .card2:hover
        {
            transform: scale(1.1);
        }
        #preview-content .card1:hover .center-card,
        #preview-content .card2:hover .center-card2
        {
            top: 63%;
            width: 95%;
            height: 95%;
            opacity: 0;
        }
        #preview-content .card1:hover .center-card-hover,
        #preview-content .card2:hover .center-card-hover2
        {
            top: 63%;
            width: 95%;
            height: 95%;
            opacity: 1;
        }
        #preview-content .card1:hover .text-center,
        #preview-content .card2:hover .text-center
        {
            opacity: 0;
        }
        #preview-content .card1:hover .icon-center,
        #preview-content .card2:hover .icon-center2
        {
            transform: translate(-50%, -50%) scale(1.2);
        }
        #preview-content .footer
        {
            padding-top: 120px;
            display: flex;
            justify-content: space-between;
        }
        #preview-content .last-center
        {
            width: 300px;
            height: 400px;
            position: absolute;
            top: 35%;
            left: 11%;
            content: \'\';
        }
        #preview-content .last-center::before
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 40%;
            height: 30%;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 5px 0px 5px #0bda67,
            inset 5px 0px 10px 3px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
            z-index: -1;
        }
        #preview-content .bg-footer
        {
            position: relative;
        }
        #preview-content .bg-footer::before
        {
            content: \'\';
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 110%;
            box-shadow: 0px 0px 30px #23ff8f79,
            inset -5px -5px 15px rgba(0,0,0,0.5),
            inset 30px 10px 35px 5px rgba(0,0,0,0.4);
            z-index: -2;
        }
        #preview-content .flex-footer
        {
            display: flex;
            margin-top: 150px;
        }
        #preview-content .col
        {
            display: flex;
            flex-direction: column;
            margin: 0px 75px;
        }
        #preview-content .col a
        {
            color: #ebe6f1c0;
            margin-bottom: 10px;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 400;
            transition: .4s;
            position: relative;
        }
        #preview-content .col a::after
        {
            content: \'\';
            position: absolute;
            top: 56%;
            left: -28%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 20px;
            height: 20px;
            box-shadow: 0px 0px 30px #23ff8f79,
            0px 0px 10px #23ff8f79,
            inset 5px 0px 5px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 10px 10px 10px 5px rgba(255,255,255,0.2);
            border-radius: 15px;
            z-index: -1;
        }
        #preview-content .col a:hover
        {
            color: ghostwhite;
            transform: scale(1.2);
        }
        #preview-content .col a:hover::after
        {
            background: #13a856;
            box-shadow: 0px 0px 20px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 5px 0px 5px rgb(255 255 255 / 20%),
            inset 10px 10px 10px 5px rgb(150, 238, 188);
        }

        #preview-content .last
        {
            padding: 0px 10%;
        }
        #preview-content .copyright
        {
            position: relative;
        }
        #preview-content .copyright::before
        {
            content: \'\';
            position: absolute;
            top: -50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 2px;
            background: #ffffff;
            box-shadow: 0px 0px 70px #23ff8f79,
            0px 0px 15px #23ff8f79,
            inset 5px 0px 5px #0bda67,
            inset -5px -5px 5px rgba(0,0,0,0.5),
            inset 10px 10px 10px 5px rgba(255,255,255,0.2);
            border-radius: 50%;
            z-index: -1;
        }

        ';


        // Create the second custom template record.
        UserTemplate::create([
            'user_id'       => $user->id,
            'project_name'  => 'Project 2',
            'html_content'  => $htmlContent2,
            'css_content'   => $combinedCss2,
            'hover_css'     => '',
            'keyframe_css'  => '',
            'media_queries' => '',
            'select_unit'   => '',
            'background_data' => '',
            'box_shadows'   => '',
            'text_shadows'  => '',
            'is_custom'     => true,
        ]);


        $htmlContent3 = '
        <div class="hero">
                <div class="header">
                    <div class="logo">
                        <h1 style="color: white;">Logo</h1>
                    </div>
                    <ul class="menu">
                        <li style="color: white;"><a href="">Home</a></li>
                        <li style="color: white;"><a href="">About</a></li>
                        <li style="color: white;"><a href="">Payment</a></li>
                        <li style="color: white;"><a href="">Contact</a></li>
                    </ul>
                </div>
                <div class="inner">
                    <div class="some-text">
                        <div class="first-text">
                            <h1>New <span>System</span> Future Has Born</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores dignissimos aspernatur exercitationem, necessitatibus nemo repudiandae.</p>
                            <a href="">Read More</a>
                        </div>
                        <div class="flex-text">
                            <div class="second-text">
                                <h1>Ai System</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, beatae!</p>
                                <a href="">Read More</a>
                            </div>
                            <div class="third-text">
                                <h1>Aisa System</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, beatae!</p>
                                <a href="">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- card-animation -->

                <div class="row">
                    <div class="first-row"></div>
                    <div class="second-row">
                        <div class="card1"></div>
                        <div class="card2"></div>
                        <div class="card3"></div>
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                    </div>
                </div>
            </div>









            <section>
                <div class="about">
                    <div class="black-square"></div>


        <!--             <div class="right-menu">
                        <div class="icon1" onclick="John()">
                            <ion-icon name="power-outline" id="icon1"></ion-icon>
                            <div id="circle1"></div>
                        </div>
                        <div class="icon2" onclick="Zack()">
                            <ion-icon name="logo-android"  id="icon2"></ion-icon>
                            <div id="line1"></div>
                            <div id="circle2"></div>
                        </div>
                        <div class="icon3" onclick="Sara()">
                            <ion-icon name="cellular-outline" id="icon3"></ion-icon>
                            <div id="line2"></div>
                            <div id="circle3"></div>
                        </div>
                    </div>  -->





                    <!-- first-box -->


                    <div class="John" id="John">
                        <div class="text" id="john-text">
                            <span><h1>Compare offers and buy crypto from Ai</h1></span>
                            <p>See real-time Bitcoin and transition prices then buy cryptocurrency with a credit card or other payment.</p>
                        </div>
                        <div class="cube-open">
                            <div class="cube">
                                <div class="box-top"></div>
                                <div class="box-footer"></div>
                                <div class="cube-light">
                                    <span style="--i:0;"></span>
                                    <span style="--i:1;"></span>
                                    <span style="--i:2;"></span>
                                    <span style="--i:3;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
            
            
            
            
            
                    <!-- second-box -->
                    
                    
                <!--  <div class="Zack" id="Zack">
                        <div class="data-base">
                            <div class="ad">
                                <h3>216,173</h3>
                                <p>Advertising</p>
                            </div>


                            
                            <div class="six-smallbox">

                                <div class="f1-box">
                                    <div class="line-f1"></div>
                                    <p>27%</p>
                                </div>


                                <div class="f2-box">
                                    <div class="line-f2"></div>
                                    <p>7%</p>
                                    <div class="text-outside">
                                        <p>Youtube Channel</p>
                                        <p>$1,234</p>
                                    </div>
                                </div>


                                <div class="f3-box">
                                    <div class="line-f3"></div>
                                    <p>5%</p>
                                    <div class="text-outside">
                                        <p>Google Ad</p>
                                        <p>$2,134</p>
                                    </div>
                                </div>


                                <div class="f4-box">
                                    <div class="line-f4"></div>
                                    <p>8%</p>
                                    <div class="text-outside">
                                        <p>Facebook Page</p>
                                        <p>$3,014</p>
                                    </div>
                                </div>


                                <div class="f5-box">
                                    <div class="line-f5"></div>
                                    <p>12%</p>
                                    <div class="text-outside">
                                        <p>Company Website</p>
                                        <p>$0,234</p>
                                    </div>
                                </div>


                                <div class="f6-box">
                                    <div class="line-f6"></div>
                                    <p>16%</p>
                                    <div class="text-outside">
                                        <p>Television Ad</p>
                                        <p>$6,534</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text" id="channel-text">
                            <span><h1>Channel Statatistics</h1></span>
                            <h1>11,234</h1>
                            <p>Grand total of income and their breakdowns showing the achievements</p>
                        </div>
                    </div> -->
            
            
            
            
                    <!-- third-box -->



                    <!-- <div class="Sara" id="Sara">
                        <div class="row2">
                            <div class="bg-box1">
                                <div class="flex2">
                                    <h1>Total Net Worth</h1>
                                    <h1>$282,234</h1>
                                </div> 
                            </div>

                            <div class="bg-box2">
                                <div class="flex2">
                                    <p>Spendings <br> $9,223</p>
                                    <div class="down"></div>
                                </div>                        
                            </div>


                            <div class="bg-box3">
                                <div class="flex2">
                                    <p>Income Source</p>
                                    

                                    <div class="flex-show">
                                        <div class="flex2">
                                            <p>$2,100</p>
                                            <div class="siri"></div>
                                            <p>E-commerce</p>
                                        </div>

                                        <div class="flex2">
                                            <p>$1,045</p>
                                            <div class="siri2"></div>
                                            <p>Google</p>
                                        </div>

                                        <div class="flex2">
                                            <p>$4,152</p>
                                            <div class="siri3"></div>
                                            <p>Shop</p>
                                        </div>

                                        <div class="flex2">
                                            <p>$12,120</p>
                                            <div class="siri4"></div>
                                            <p>Salary</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="bg-box4">
                                <div class="flex2">
                                    <p>Income <br> $21,223</p>
                                    <div class="up"></div>
                                </div>                        
                            </div>

                            <div class="bg-box5">
                                <div class="flex2">
                                    <p>Income Expenses</p>


                                    <div class="box-income">
                                        <div class="flex3">
                                            <p>40,000</p>
                                            <p>35,000</p>
                                            <p>30,000</p>
                                            <p>25,000</p>
                                            <p>20,000</p>
                                            <p>15,000</p>
                                            <p>10,000</p>
                                            <p>5,000</p>
                                        </div>
                                        <div class="bg-income">
                                            <div class="line-income1"></div>
                                            <div class="line-income2"></div>
                                        </div>
                                        <div class="flex4">
                                            <p>0</p>
                                            <p>Jan</p>
                                            <p>Feb</p>
                                            <p>Mar</p>
                                            <p>Apr</p>
                                            <p>May</p>
                                            <p>Jun</p>
                                            <p>Aug</p>
                                            <p>Sep</p>
                                            <p>Nov</p>
                                            <p>Dec</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="row3">
                            <div class="bg-box6">
                                <div class="flex2">
                                    <h1>Spendings</h1>

                                    <div class="flex">
                                        <div class="icon">
                                            <ion-icon name="logo-android"  id="icon2"></ion-icon>
                                        </div>
                                        <p>Housing <br> $3,532</p>
                                    </div>

                                    <div class="flex">
                                        <div class="icon">
                                            <ion-icon name="accessibility-outline" id="icon2"></ion-icon>
                                        </div>
                                        <p>Personal <br> $2,422</p>
                                    </div>
                                    <div class="flex">
                                        <div class="icon">
                                            <ion-icon name="bar-chart-outline" id="icon2"></ion-icon>
                                        </div>
                                        <p>Transportation <br> $1,532</p>
                                    </div>
                                </div>                        
                            </div>


                            <div class="bg-box7">
                                <div class="flex2">
                                    <p>Assets</p>
            
                                    <div class="circle-income"></div>
            
                                    <div class="flex">
                                        <div class="text">
                                            <p>Gold <br> $15,500</p>
                                            <p>Stock <br> $22,500</p>
                                        </div>
                                        <div class="text" style="margin-left: 180px;">
                                            <p>Warehouse <br> $141,500</p>
                                            <p>Land <br> $105,500</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

            </section>












            <section class="page3">
                <div class="payment">
                    <div class="text">
                        <p>Annually Financial Statistics</p>
                        <h1>Project Status Reporting</h1>
                    </div>


                    <div class="pay">
                        
                        <div class="line-box1"></div>
                        <div class="line-box2"></div>
                        <div class="line-box3"></div>
                        <div class="line-box4"></div>
                        <div class="line-box5"></div>
                        <div class="line-box6"></div>
                        <div class="line-box7"></div>
                        <div class="line-box8"></div>




                        <!-- box-card -->


                        <div class="box1" onclick="Page1()">
                            <h3>Finance</h3>
                            <h3>12,122</h3>
                            <p>Increased By 120%</p>
                        </div>
                        <div class="flex-link">
                            <a>Buy</a>
                            <a onclick="backPage1()">Back</a>
                        </div>
                        
                        <div class="flex-pay">
                            <div class="box2" onclick="Page2()">
                                <h3>Invesments</h3>
                                <h3>105,652</h3>
                                <p>20% Mounthly Increased</p>
                            </div>

                            <div class="box3" onclick="Page3()">
                                <h3>Projects</h3>
                                <h3>512,122</h3>
                                <p>85% Quarterly Increased</p>
                            </div>

                            <div class="box4" onclick="Page4()">
                                <h3>Sales</h3>
                                <h3>140,122</h3>
                                <p>63% Yearly Increased</p>
                            </div>
                        </div>

                        <div class="flex-pay">
                            <div class="box5" onclick="Page5()">
                                <h3>Department</h3>
                                <h3>257,652</h3>
                                <p>41% Yearly Increased</p>
                            </div>

                            <div class="box6" onclick="Page6()">
                                <h3>Technical</h3>
                                <h3>456,122</h3>
                                <p>29% Mounthly Increased</p>
                            </div>

                            <div class="box7" onclick="Page7()">
                                <h3>License</h3>
                                <h3>350,122</h3>
                                <p>43% Mounthly Increased</p>
                            </div>
                        </div>





                        <!-- box-detail -->

                        <div class="box-click1">
                            <div class="center-box">
                                <div class="div"></div>
                                <div class="box-icon">
                                    <ion-icon name="logo-bitcoin"></ion-icon>
                                    <div class="circle1" id="color1"></div>
                                    <div class="circle2" id="color1"></div>
                                    <div class="circle3" id="color1"></div>
                                </div>

                            </div>

                        </div>
                        <div class="box-click2">
                            <div class="center-box">
                                <div class="box-icon">
                                    <ion-icon name="logo-web-component" style="animation: shadow 5s ease-in-out forwards infinite;"></ion-icon>
                                    <div class="circle1" id="color2"></div>
                                    <div class="circle2" id="color2"></div>
                                    <div class="circle3" id="color2"></div>
                                </div>
                                <div class="div"></div>
                            </div>
                        </div>
                        <div class="box-click3">
                            <div class="center-box">
                                <div class="div"></div>
                                <div class="box-icon">
                                    <ion-icon name="diamond-outline" style="animation: shadow 5s ease-in-out forwards infinite;"></ion-icon>
                                    <div class="circle1" id="color2"></div>
                                    <div class="circle2" id="color2"></div>
                                    <div class="circle3" id="color2"></div>
                                </div>

                            </div>
                        </div>
                        <div class="box-click4">
                            <div class="center-box">
                                <div class="box-icon">
                                    <ion-icon name="calendar-number-outline" style="animation: shadow 5s ease-in-out forwards infinite;"></ion-icon>
                                    <div class="circle1" id="color2"></div>
                                    <div class="circle2" id="color2"></div>
                                    <div class="circle3" id="color2"></div>
                                </div>
                                <div class="div"></div>
                            </div>
                        </div>
                        <div class="box-click5">
                            <div class="center-box">
                                <div class="div"></div>
                                <div class="box-icon">
                                    <ion-icon name="business-outline"></ion-icon>
                                    <div class="circle1" id="color3"></div>
                                    <div class="circle2" id="color3"></div>
                                    <div class="circle3" id="color3"></div>
                                </div>

                            </div>
                        </div>
                        <div class="box-click6">
                            <div class="center-box">
                                <div class="box-icon">
                                    <ion-icon name="alarm-outline"></ion-icon>
                                    <div class="circle1" id="color3"></div>
                                    <div class="circle2" id="color3"></div>
                                    <div class="circle3" id="color3"></div>
                                </div>
                                <div class="div"></div>
                            </div>
                        </div>
                        <div class="box-click7">
                            <div class="center-box">
                                <div class="div"></div>
                                <div class="box-icon">
                                    <ion-icon name="checkbox-outline"></ion-icon>
                                    <div class="circle1" id="color3"></div>
                                    <div class="circle2" id="color3"></div>
                                    <div class="circle3" id="color3"></div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="text">
                        <div class="black-square2"></div>
                        <h1>2024</h1>
                        <p>Click On Box To See More Information</p>
                    </div>
                </div>
            </section>











            <section>
                <div class="contact">
                    <div class="text">
                        <h1>Contact Us We Have Every Support That You Need.</h1>
                        <p>We more then 50 support in this company and we ready to answer your question.</p>
                    </div>
                    <form>
                        <div class="windows-bg"></div>
                        
                        <input type="text" name="" id="" placeholder="Enter Your Name">
                        <input type="email" placeholder="Enter Your Email">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Enter Your Description"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>







            <section class="comment">
                <div class="company">




                    <!-- first-animation -->


                    <div class="windows-text">
                        <div class="windows-bg2"></div>
                        <h1>John Ridim</h1>
                        <p>It"s Been Good Time Working With This Beautiful Company My Wallet In Hand Safe.</p>
                    </div>


                    <div class="box-arrow">
                        <div class="circle-arrow"></div>
                        <div class="circle-arrow" style="animation: roti 4s linear reverse infinite; width: 600px; height: 400px;"></div>
                        <div class="box-icon2">
                            <ion-icon name="logo-playstation"></ion-icon>
                        </div>
                    </div>





                    <div class="position1">
                        <div class="windows-text" id="left-side">
                            <div class="windows-bg2"></div>
                            <h1>Danni Amber</h1>
                            <p>Finnaly Good Company With Nice Secure That Keep Our Wallet Safe.</p>
                        </div>

                        <div class="box-arrow" id="right-side">
                            <div class="circle-arrow"></div>
                            <div class="circle-arrow" style="animation: roti 4s linear reverse infinite; width: 600px; height: 400px;"></div>
                            <div class="box-icon2">
                                <ion-icon name="logo-apple"></ion-icon>
                            </div>
                        </div>
                    </div>






                    <div class="position2">

                        <div class="windows-text" id="left-side2">
                            <div class="windows-bg2"></div>
                            <h1>Alex Mori</h1>
                            <p>Best Way To Keep My Wallet Safe It"s Good To Have This Company.</p>
                        </div>


                        <div class="box-arrow" id="right-side2">
                            <div class="circle-arrow"></div>
                            <div class="circle-arrow" style="animation: roti 4s linear reverse infinite; width: 600px; height: 400px;"></div>
                            <div class="box-icon2">
                                <ion-icon name="logo-xbox"></ion-icon>
                            </div>
                        </div>                
                    </div>

                </div>
            </section>













            <section class="bg-footer">
                <div class="light"></div>



                <!-- textCopy-card -->


                <div class="text-on-mobile">
                    <div class="circle-rotate"></div>


                    <div class="skew-text">
                        <div class="first-text">
                            <h1>New <span>System</span> Future Has Born</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores dignissimos aspernatur exercitationem, necessitatibus nemo repudiandae.</p>
                        </div>
                        <div class="flex-text">
                            <div class="second-text">
                                <h1>Ai System</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, beatae!</p>
                            </div>
                            <div class="third-text">
                                <h1>Aisa System</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, beatae!</p>
                            </div>
                        </div>
                    </div>
                </div>




                
                <div class="footer">
                    <div class="logo-text">
                        <h1>Logo</h1>
                        <p>A New Way With Ai Payment</p>
                    </div>
                    <div class="flex-footer">
                        <div class="col">
                            <p>Useful Link</p>
                            <a href="#">Content</a>
                            <a href="#">Work</a>
                            <a href="#">Create</a>
                            <a href="#">Explore</a>
                            <a href="#">Terms & Services</a>
                        </div>
                        <div class="col">
                            <p>Community</p>
                            <a href="#">Help</a>
                            <a href="#">Partners</a>
                            <a href="#">Blog</a>
                            <a href="#">News</a>
                            <a href="#">Rewards</a>
                        </div>
                        <div class="col">
                            <p>Afflite</p>
                            <a href="#">Our Partner</a>
                            <a href="#">Become Partners</a>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="last">
                <div class="copyright">
                    <div class="copyright-text">
                        <p>2023 Logo All Rights Reserved.</p>
                    </div>
                </div>
            </section>


            
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            
        ';

        $combinedCss3 = '
        #preview-content * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif, Helvetica, sans-serif;
        }
        .Body
        {
            background: #080b19;
        }
        #preview-content::-webkit-scrollbar
        {
            width: 12px;
            transition: 2s;
        }
        #preview-content::-webkit-scrollbar-track
        {
            background: #1f0a50;
            box-shadow: 0px 0px 5px #219cf3, 
            0px 0px 7px #219cf3, 
            inset 15px -10px 17px #3a3546, 
            inset -5px 2px 17px #124b73;
            transition: 2s;
        }
        #preview-content::-webkit-scrollbar-thumb
        {
            border-radius: 5px;
            background: ghostwhite;
            transition: 2s;
        }
        #preview-content section
        {
            padding: 170px 10%;
        }
        #preview-content .logo h1
        {
            font-size: 2.0rem;
            margin-bottom: 0px;
        }
        #preview-content h1
        {
            color: white;
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 600;
            max-width: 500px;
        }
        #preview-content p
        {
            color: white;
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 30px;
            max-width: 500px;
        }
        #preview-content span
        {
            color: white;
            text-shadow: 0px 0px 7px #219cf3,
            0px 0px 10px #219cf3;
        }




        #preview-content .hero {
            width: 100%;
            height: 100vh;
            position: relative;
        }
        #preview-content .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 10%;
        }
        #preview-content .menu
        {
            display: flex;
            list-style-type: none;
        }
        #preview-content .menu li a
        {
            padding: 7px 25px;
            margin: 0px 10px;
            text-decoration: none;
            color: white;
            position: relative;
            z-index: 1;
            transition: .4s ease-in .1s;
        }
        #preview-content .menu li a::before
        {
            content: \'\';
            width: 0px;
            height: 2px;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            box-shadow: 0px 0px 17px #219cf3, 0px 0px 20px #219cf3;
            transition: .4s ease-in .1s;
            margin: 0 auto;
            display: block;
        }
        #preview-content .menu li a:hover
        {
            color: white;
            text-shadow: 0px 0px 7px #219cf3,
            0px 0px 10px #219cf3;
        }
        #preview-content .menu li a:hover::before
        {
            background: white;
            box-shadow: 0px 0px 7px #219cf3, 0px 0px 10px #219cf3;
            width: 70px;
        }
        #preview-content .inner
        {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            grid-gap: 50px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding-left: 10%;
        }
        #preview-content .row
        {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            height: 60vh;
        }
        #preview-content .flex-text
        {
            display: flex;
            grid-gap: 50px;
            transform: translateY(180px);
        }
        #preview-content .second-text h1,
        #preview-content .third-text h1
        {
            color: white;
            font-size: 2rem;
            margin-bottom: 20px;
            font-weight: 600;
            text-shadow: 0px 0px 7px #219cf3,
            0px 0px 10px #219cf3;
        }
        #preview-content .second-text p,
        #preview-content .third-text p
        {
            color: white;
            font-size: 1rem;
            font-weight: 500;
            margin-bottom: 30px;
            max-width: 500px;
        }
        #preview-content .first-text a,
        #preview-content .second-text a,
        #preview-content .third-text a
        {
            padding: 7px 25px;
            text-decoration: none;
            color: white;
            position: relative;
            z-index: 1;
            transition: .4s ease-in .2s;
            border-radius: 20px;
            background: transparent;
            box-shadow: 0px 0px 7px #219cf3, 0px 0px 10px #219cf3;
        }
        #preview-content .first-text a::before,
        #preview-content .second-text a::before,
        #preview-content .third-text a::before
        {
            content: \'\';
            width: 20px;
            height: 40px;
            position: absolute;
            top: 0%;
            left: 119%;
            background: #dfebf5;
            box-shadow: 0px 0px 17px #219cf3, 0px 0px 20px #219cf3;
            transition: .4s cubic-bezier(0.6, 0.15, 0, 0.74) .7s;
            margin: 0 auto;
            display: block;
            border-radius: 5px;
        }
        #preview-content .first-text a::before
        {
            animation: f1 4s linear forwards infinite;
        }
        #preview-content .second-text a::before
        {
            animation: f1 5s linear forwards infinite;
        }
        #preview-content .third-text a::before
        {
            animation: f1 6s linear forwards infinite;
        }
        @keyframes f1
        {
            0%
            {
                background: #dfebf5;
            }
            25%
            {
                background: #191a1b;
            }
            50%
            {
                background: #0e0f0f;
            }
            75%
            {
                background: #191a1b;
            }
            100%
            {
                background: #dfebf5;
            }
        }
        #preview-content .first-text a::after,
        #preview-content .second-text a::after,
        #preview-content .third-text a::after
        {
            content: \'\';
            width: 170px;
            height: 45px;
            position: absolute;
            top: 54%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-left: 2px solid transparent;
            border-right: 2px solid transparent;
            border-top-left-radius: 20px;
            border-bottom-right-radius: 20px;
            transition: .8s ease-in .2s;
            display: flex-end;
            z-index: -1;
        }
        #preview-content .first-text a:hover::before,
        #preview-content .second-text a:hover::before,
        #preview-content .third-text a:hover::before
        {
            width: 150px;
            height: 2px;
            transform: translateX(-50%);
            top: 57%;
            left: 50%;
        }
        #preview-content .first-text a:hover::after,
        #preview-content .second-text a:hover::after,
        #preview-content .third-text a:hover::after
        {
            border-left: 2px solid #9bcaec;
            border-right: 2px solid #9bcaec;
            border-top-left-radius: 30px;
            border-bottom-right-radius: 30px;
            width: 123px;
        }
        #preview-content .first-text a:hover,
        #preview-content .second-text a:hover,
        #preview-content .third-text a:hover
        {
            color: white;
            text-shadow: 0px 0px 7px #219cf3,
            0px 0px 10px #219cf3;
            box-shadow: 0px 0px 0px #219cf3, 0px 0px 0px #219cf3;
        }
        #preview-content .first-row
        {
            content: \'\';
            width: 50px;
            height: 450px;
        }
        #preview-content .second-row
        {
            content: \'\';
            width: 500px;
            height: 500px;
            position: relative;
            left: 10%;
            top: 10%;
        }
        #preview-content .second-row::before
        {
            content: \'\';
            width: 780px;
            height: 780px;
            border-radius: 50%;
            box-shadow: inset 0px 0px 114px #219cf3, inset 0px 0px 30px white;
            position: absolute;
            top: 50%;
            left: 60%;
            transform: translate(-50%, -50%);
            filter: blur(64px);
            z-index: -2;
        }


        #preview-content .card1
        {
            content: \'\';
            width: 125px;
            height: 250px;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: inset 0px 0px 100px #219cf3, inset 0px 0px 5px #219cf3;
            position: absolute;
            top: 174px;
            left: 50%;
            transform: rotate(60deg) skew(5deg, -33deg);
            animation: card1 3s linear forwards infinite;
        }
        @keyframes card1
        {
            0%
            {
                top: 174px;
            }
            25%
            {
                top: 100px;
            }
            50%
            {
                top: 100px;
            }
            100%
            {
                top: 174px;
            }
        }
        #preview-content .card2
        {
            content: \'\';
            width: 125px;
            height: 250px;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: inset 0px 0px 100px #219cf3, inset 0px 0px 5px #219cf3;
            position: absolute;
            top: 100px;
            left: 50%;
            transform: rotate(60deg) skew(5deg, -33deg);
        }
        #preview-content .card3
        {
            content: \'\';
            width: 125px;
            height: 250px;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: inset 0px 0px 100px #219cf3, inset 0px 0px 5px #219cf3;
            position: absolute;
            top: 26px;
            /* left: 308px; */
            left: 50%;
            transform: rotate(60deg) skew(5deg, -33deg);
            animation: card3 3s linear forwards infinite;
        }
        @keyframes card3
        {
            0%
            {
                top: 26px;
            }
            25%
            {
                top: 100px;
            }
            50%
            {
                top: 100px;
            }
            100%
            {
                top: 26px;
            }
        }
        #preview-content .circle1
        {
            content: \'\';
            width: 75px;
            height: 75px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: inset 23px -15px 30px #219cf3, 
            inset 0px 0px 10px #219cf3;
            position: absolute;
            top: 355px;
            left: 493px;
            animation: c1 3s linear forwards infinite;
        }
        #preview-content .circle2
        {
            content: \'\';
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: inset 8px -8px 10px #219cf3, inset 0px 0px 5px #219cf3;
            position: absolute;
            top: 435px;
            left: 185px;
            animation: c1 4s linear forwards infinite;
        }
        #preview-content .circle3
        {
            content: \'\';
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: inset 36px -22px 30px #219cf3, inset 0px 0px 10px #219cf3;
            position: absolute;
            top: 20px;
            left: 60px;
            animation: c1 5s linear forwards infinite;
        }
        @keyframes c1
        {
            0%
            {
                transform: translateY(0px);
            }
            50%
            {
                transform: translateY(40px);
            }
            100%
            {
                transform: translateY(0px);
            }
        }


            #preview-content .about
            {
                position: relative;
            }
            #preview-content .right-menu
            {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                grid-gap: 150px;
                z-index: 2;
            }
            #preview-content .icon1,
            #preview-content .icon2,
            #preview-content .icon3
            {
                position: relative;
            }
            #preview-content .icon1 ion-icon
            {
                color: white;
                font-size: 2.0rem;
                padding: 15px;
                background: #080b19;
                border-radius: 50%;
                box-shadow: inset 0px 0px 12px #219cf3, 
                inset 0px 2px 17px #219cf3;
            }
            #preview-content .icon2 ion-icon,
            #preview-content .icon3 ion-icon
            {
                color: #777777;
                font-size: 2.0rem;
                padding: 15px;
                background: transparent;
                border-radius: 50%;
                transition: .3s linear .1s;
            }
            #preview-content #circle1
            {
                content: \'\';
                position: absolute;
                top: 48%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0px 0px 15px #219cf3, 
                0px 0px 20px #219cf3,
                inset 0px 0px 3px #219cf3;
                width: 125%;
                height: 120%;
                border-radius: 50%;
                border: 7px solid #f2f7ff;
            }
            #preview-content #circle2,
            #preview-content #circle3
            {
                content: \'\';
                position: absolute;
                top: 48%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 125%;
                height: 120%;
                border-radius: 50%;
                border: 7px solid #777777;
                transition: .3s linear .1s;
            }
            #preview-content #line1,
            #preview-content #line2
            {
                content: \'\';
                position: absolute;
                top: -110%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #777777;
                width: 2px;
                height: 140px;
                z-index: -2;
                transition: .3s linear .1s;
            }
            #preview-content .icon2:hover ion-icon,
            #preview-content .icon3:hover ion-icon
            {
                color: white;
                background: #080b19;
                box-shadow: inset 0px 0px 12px #219cf3, 
                inset 0px 2px 17px #219cf3;
            }
            #preview-content #circle2:hover,
            #preview-content #circle3:hover
            {
                box-shadow: 0px 0px 15px #219cf3, 
                0px 0px 20px #219cf3,
                inset 0px 0px 3px #219cf3;
                border: 7px solid #f2f7ff;
            }

            #preview-content #circle2:hover,
            #preview-content #circle3:hover
            {
                box-shadow: 0px 0px 15px #219cf3, 
                0px 0px 20px #219cf3,
                inset 0px 0px 3px #219cf3;
                border: 7px solid #f2f7ff;
            }







            #preview-content .John
            {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items: center;
                grid-gap: 50px;
                position: relative;
                width: 100%;
                height: 500px;
            }

            #preview-content #john-text
            {
                transition: .7s linear .3s;
            }
            #preview-content .cube-open
            {
                position: relative;
                width: 400px;
                height: 400px;
                z-index: 5;
                transition: .7s linear .3s;
                margin: 0 auto;
            }
            #preview-content .cube
            {
                position: absolute;
                top: 25%;
                left: 25%;
                transform: translate(-50%, -50%);
                width: 200px;
                height: 200px;
                transform-style: preserve-3d;
                animation: cube 15s linear infinite;
                background: transparent;
                transition: .9s linear .3s;
            }
            @keyframes cube
            {
                0%
                {
                    transform: rotateX(-20deg) rotateY(0deg) rotate(0deg);
                }
                100%
                {
                    transform: rotateX(-20deg) rotateY(360deg) rotate(360deg);
                }
            }
            #preview-content .cube-light
            {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                transform-style: preserve-3d;
            }
            #preview-content .cube-light span
            {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                transform: rotateY(calc(90deg * var(--i))) translateZ(100px);
                background: linear-gradient(#c3e8ff, #219cf3);
                border-radius: 10px;
                transition: .3s linear .1s;
            }

            #preview-content .box-top
            {
                position: absolute;
                left: 0;
                top: 130%;
                height: 200px;
                width: 200px;
                background: #7accff;
                box-shadow: inset 0px 0px 50px #c3e8ff, 
                inset 0px 2px 20px #219cf3;
                transform: rotateX(90deg) translateZ(360px);
                border-radius: 10px;
                transition: .3s linear .1s;
            }
            #preview-content .box-footer
            {
                position: absolute;
                left: 0;
                top: -150%;
                height: 200px;
                width: 200px;
                background: #7accff;
                box-shadow: inset 0px 0px 50px #c3e8ff, 
                inset 0px 2px 20px #219cf3;
                transform: rotateX(90deg) translateZ(-400px);
                border-radius: 10px;
                transition: .3s linear .1s;
            }
            #preview-content .cube-open:hover .cube-light span
            {
                transform: rotateY(calc(90deg * var(--i))) translateZ(200px);
            }
            #preview-content .cube-open:hover .box-top
            {
                top: 30%;
            }
            #preview-content .cube-open:hover .box-footer
            {
                top: -50%;
            }



            #preview-content .Zack
            {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items: center;
                grid-gap: 50px;
                width: 100%;
                height: 500px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: -2;
            }
            #preview-content .data-base
            {
                position: relative;
                width: 500px;
                max-width: 500px;
                opacity: 0;
                transform: translateX(-70px);
                transition: .7s linear .3s;
            }
            #channel-text
            {
                opacity: 0;
                transform: translateX(70px);
                transition: .7s linear .3s;
            }
            #preview-content .ad
            {
                position: absolute;
                top: 70%;
                left: 80%;
                transform: translate(-50%, -50%);
                width: 150px;
                height: 150px;
                border-radius: 50%;
                padding: 10px;
                text-align: center;
            }
            #preview-content .ad::before
            {
                content: \'\';
                width: 150px;
                height: 150px;
                border-radius: 50%;
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: -1;
                box-shadow: 0px 0px 15px #219cf3, 
                0px 0px 20px #219cf3, 
                inset 0px 0px 3px #219cf3;
                border: 7px solid #f2f7ff;
            }
            #preview-content .ad::after
            {
                content: \'\';
                width: 150px;
                height: 150px;
                border-radius: 50%;
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: -1;
                background: #080a11;
                box-shadow: inset 0px 0px 12px #219cf3, inset 0px 2px 17px #219cf3;
            }
            #preview-content .ad h3
            {
                color: white;
                font-size: 1.6rem;
                font-weight: 500;
                margin-bottom: 10px;
            }
            #preview-content .six-smallbox
            {
                position: relative;
                width: 200%;
                height: 500px;
            }
            #preview-content .f1-box {
                position: absolute;
                top: 35%;
                left: 15%;
                width: 60px;
                height: 60px;
                padding: 10px;
                background: linear-gradient(90deg, #080a11, #0c1024);
                border: 3px solid #777777;
                border-radius: 50%;
                color: #777777;
                cursor: pointer;
                transition: .5s linear .4s;
            }
            #preview-content .f2-box {
                position: absolute;
                top: 8%;
                left: 23%;
                width: 60px;
                height: 60px;
                padding: 10px;
                background: linear-gradient(90deg, #080a11, #0c1024);
                border: 3px solid #777777;
                border-radius: 50%;
                color: #777777;
                cursor: pointer;
                transition: .5s linear .4s;
            }
            #preview-content .f3-box {
                position: absolute;
                top: 15%;
                left: 5%;
                width: 60px;
                height: 60px;
                padding: 10px;
                background: linear-gradient(90deg, #080a11, #0c1024);
                border: 3px solid #777777;
                border-radius: 50%;
                color: #777777;
                cursor: pointer;
                transition: .5s linear .4s;
            }
            #preview-content .f4-box {
                position: absolute;
                top: 41%;
                left: 0%;
                width: 60px;
                height: 60px;
                padding: 10px;
                background: linear-gradient(90deg, #080a11, #0c1024);
                border: 3px solid #777777;
                border-radius: 50%;
                color: #777777;
                cursor: pointer;
                transition: .5s linear .4s;
            }
            #preview-content .f5-box {
                position: absolute;
                top: 58%;
                left: 5%;
                width: 60px;
                height: 60px;
                padding: 10px;
                background: linear-gradient(90deg, #080a11, #0c1024);
                border: 3px solid #777777;
                border-radius: 50%;
                color: #777777;
                cursor: pointer;
                transition: .5s linear .4s;
            }
            #preview-content .f6-box {
                position: absolute;
                top: 65%;
                left: 15%;
                width: 60px;
                height: 60px;
                padding: 10px;
                background: linear-gradient(90deg, #080a11, #0c1024);
                border: 3px solid #777777;
                border-radius: 50%;
                color: #777777;
                cursor: pointer;
                transition: .5s linear .4s;
            }
            #preview-content .line-f1
            {
                content: \'\';
                position: absolute;
                top: 145%;
                left: 220%;
                transform: translate(-50%, -50%) rotate(299deg);
                background: #777777;
                width: 2px;
                height: 200px;
                z-index: -2;
                transition: .4s linear .2s;
            }
            #preview-content .line-f2
            {
                content: \'\';
                position: absolute;
                top: 170%;
                left: -18%;
                transform: translate(-50%, -50%) rotate(212deg);
                background: #777777;
                width: 2px;
                height: 110px;
                z-index: -2;
                transition: .4s linear .2s;
            }
            #preview-content .line-f3
            {
                content: \'\';
                position: absolute;
                top: 129%;
                left: 133%;
                transform: translate(-50%, -50%) rotate(134deg);
                background: #777777;
                width: 2px;
                height: 120px;
                z-index: -2;
                transition: .4s linear .2s;
            }
            #preview-content .line-f4
            {
                content: \'\';
                position: absolute;
                top: 26%;
                left: 205%;
                transform: translate(-50%, -50%) rotate(80deg);
                background: #777777;
                width: 2px;
                height: 137px;
                z-index: -2;
                transition: .4s linear .2s;
            }
            #preview-content .line-f5 
            {
                content: \'\';
                position: absolute;
                top: -40%;
                left: 129%;
                transform: translate(-50%, -50%) rotate(45deg);
                background: #777777;
                width: 2px;
                height: 115px;
                z-index: -2;
                transition: .4s linear .2s;
            }
            #preview-content .line-f6
            {
                content: \'\';
                position: absolute;
                top: -84%;
                left: 51%;
                transform: translate(-50%, -50%) rotate(-1deg);
                background: #777777;
                width: 2px;
                height: 95px;
                z-index: -2;
                transition: .4s linear .2s;
            }
            #preview-content .f1-box p,
            #preview-content .f2-box p,
            #preview-content .f3-box p,
            #preview-content .f4-box p,
            #preview-content .f5-box p,
            #preview-content .f6-box p 
            {
                color: unset;
                font-size: 1.3rem;
                font-weight: 500;
                margin-bottom: 0px;
                transition: .3s linear .1s;
            }
            #preview-content .text-outside p
            {
                width: 200px;
                height: 100%;
                font-size: 1.0rem;
            }
            #preview-content .f2-box .text-outside {
                position: absolute;
                top: -80%;
                left: 100%;
            }
            #preview-content .f3-box .text-outside {
                position: absolute;
                top: -105%;
                left: 65%;
            }
            #preview-content .f4-box .text-outside {
                position: absolute;
                top: -80%;
                left: -130%;
            }
            #preview-content .f5-box .text-outside {
                position: absolute;
                top: 115%;
                left: -115%;
            }
            #preview-content .f6-box .text-outside {
                position: absolute;
                top: 115%;
                left: 10%;
            }
            #preview-content .f1-box:hover p,
            #preview-content .f2-box:hover p,
            #preview-content .f3-box:hover p,
            #preview-content .f4-box:hover p,
            #preview-content .f5-box:hover p,
            #preview-content .f6-box:hover p
            {
                color: white;
            }

            #preview-content .f1-box:hover,
            #preview-content .f2-box:hover,
            #preview-content .f3-box:hover,
            #preview-content .f4-box:hover,
            #preview-content .f5-box:hover,
            #preview-content .f6-box:hover
            {
                box-shadow: 0px 0px 15px #219cf3, 
                0px 0px 20px #219cf3;
                border: 3px solid #f2f7ff;
            }
            #preview-content .f1-box:hover .line-f1,
            #preview-content .f2-box:hover .line-f2,
            #preview-content .f3-box:hover .line-f3,
            #preview-content .f4-box:hover .line-f4,
            #preview-content .f5-box:hover .line-f5,
            #preview-content .f6-box:hover .line-f6
            {
                background: #f2f7ff;
            }




            #preview-content .Sara
            {
                display: flex;
                align-items: center;
                grid-gap: 25px;
                width: 90%;
                height: 500px;
                position: absolute;
                top: 50%;
                left: 40%;
                transform: translate(-50%, -50%);
                z-index: -2;
            }
            #preview-content .row2
            {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 25px;
                flex: 100%;
            }
            #preview-content .row3
            {
                display: flex;
                flex-direction: column;
                grid-gap: 25px;
                flex: 60%;
            }
            #preview-content .bg-box1,
            #preview-content .bg-box2,
            #preview-content .bg-box3,
            #preview-content .bg-box4,
            #preview-content .bg-box5,
            #preview-content .bg-box6,
            #preview-content .bg-box7
            {
                background: #080b19;
                box-shadow: inset 0px 0px 12px #219cf3, 
                inset 0px 2px 17px #219cf3;
                border-radius: 20px;
            }
            #preview-content .bg-box4
            {
                height: 70%;
            }
            #preview-content .flex
            {
                display: flex; 
                grid-gap: 25px;
                padding: 20px;
            }
            #preview-content .flex-show
            {
                display: flex; 
                align-items: end;
                text-align: center;
            }
            #preview-content .flex2
            {
                display: flex; 
                flex-direction: column;
                padding: 20px;
                position: relative;
            }
            #preview-content .flex3
            {
                display: flex; 
                flex-direction: column;
                padding-top: 10px;
            }
            #preview-content .flex4
            {
                display: flex; 
                grid-gap: 15px;
            }
            #preview-content .bg-box1
            {
                transform: translateY(-70px);
                opacity: 0;
                transition: .5s linear .3s;
            }
            #preview-content .bg-box2
            {
                transform: translateY(-70px);
                opacity: 0;
                transition: .6s linear .4s;
            }
            #preview-content .bg-box3
            {
                transform: translateX(-70px);
                opacity: 0;
                transition: .6s linear .5s;
            }
            #preview-content .bg-box4
            {
                transform: translateY(70px);
                opacity: 0;
                transition: .6s linear .6s;
            }
            #preview-content .bg-box5
            {
                transform: translateX(70px);
                opacity: 0;
                transition: .7s linear .7s;
            }
            #preview-content .bg-box6
            {
                transform: translateY(-70px);
                opacity: 0;
                transition: .7s linear .8s;
            }
            #preview-content .bg-box7
            {
                transform: translateY(70px);
                opacity: 0;
                transition: .7s linear .9s;
            }
            #preview-content .flex h1,
            #preview-content .flex2 h1
            {
                font-size: 1.5rem;
                max-width: none;
            }
            #preview-content .flex p,
            #preview-content .flex2 p
            {
                font-size: 1rem;
                max-width: none;
                margin-bottom: 5px;
            }
            #preview-content .bg-income {
                width: 73%;
                height: 62%;
                background: #080b19;
                box-shadow: 0px 0px 5px #219cf3, 0px 0px 7px #219cf3;
                border-radius: 5px;
                position: absolute;
                top: 50%;
                left: 55%;
                transform: translate(-50%, -50%);
            }

            #preview-content .circle-income
            {
                content: \'\';
                width: 135px;
                height: 135px;
                margin: 0 auto;
                border-top: 20px solid #8f3a12;
                border-left: 20px solid #8f1212;
                border-bottom: 20px solid #8f1212;
                border-right: 20px solid #8f3a12;
                border-radius: 50%;
            }
            #preview-content .siri 
            {
                content: \'\';
                background: #d8d8d8;
                width: 30px;
                height: 10px;
                margin: 0 auto;
            }
            #preview-content .siri2
            {
                content: \'\';
                background: #8f1212;
                width: 30px;
                height: 5px;
                margin: 0 auto;
            }
            #preview-content .siri3
            {
                content: \'\';
                background: #d8d8d8;
                width: 30px;
                height: 25px;
                margin: 0 auto;
            }
            #preview-content .siri4
            {
                content: \'\';
                background: #51d12a;
                width: 30px;
                height: 55px;
                margin: 0 auto;
            }
            #preview-content .down
            {
                content: \'\';
                position: absolute;
                top: 125%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(105deg);
                background: #8f1212;
                width: 4px;
                height: 115px;
                border-radius: 20px;
            }
            #preview-content .up 
            {
                content: \'\';
                position: absolute;
                top: 125%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(80deg);
                background: #8f3a12;
                width: 4px;
                height: 115px;
                border-radius: 20px;
            }
            #preview-content .line-income1
            {
                content: \'\';
                position: absolute;
                top: 94%;
                left: 51%;
                transform: translate(-50%, -50%) rotate(333deg);
                width: 60%;
                height: 160%;
                border-top: 2px solid #8f1212;
                border-top-right-radius: 200px;
            }
            #preview-content .line-income2
            {
                content: \'\';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(63deg);
                background: #8f3a12;
                width: 2px;
                height: 186%;
                border-radius: 20px;
            }
            #preview-content .icon
            {
                position: relative;
            }
            #preview-content .icon ion-icon
            {
                content: \'\';
                background: #080b19;
                box-shadow: inset 0px 0px 12px #219cf3, 
                inset 0px 2px 17px #219cf3;
                border-radius: 20px;
                padding: 20px;
                font-size: 1.5rem;
                color: white;
            }
            #preview-content .bg-box6 .flex
            {
                padding: 10px 20px
            }

            #preview-content .black-square
            {
                content: \'\';
                position: absolute;
                top: 130%;
                left: -100px;
                transform: translateY(-50%) matrix3d(1, 0, 0, -0.008, 0, 1, 0, 0.01, 0, 0, 1, 0, 0, 0, 0, 2);
            /*     transform: translateY(-50%) matrix3d(1, 0, 0, -0.008, 0, 1, 0, 0.01, 0, 0, 1, 0, 0, 0, 0, 2) rotate(-230deg); */
                background: transparent;
                box-shadow: 0px 0px 18px #21d0f3, 
                0px 0px 16px #219bf3, 
                inset -8px 8px 10px #3e5ec2, 
                inset 5px -6px 17px #125f73;
                width: 191px;
                height: 160px;
                border-radius: 5px;
                z-index: -2;
            }



            #preview-content .page3
            {
                overflow: hidden;
                padding: 170px 10% 240px 10%;
            }
            #preview-content .payment h1
            {
                max-width: none;
                margin-bottom: 30px;
            }
            #preview-content .payment p
            {
                margin-bottom: 0px;
            }
            #preview-content .payment h3 
            {
                color: white;
                font-size: 1.3rem;
                font-weight: 500;
            }
            #preview-content .text
            {
                position: relative;
            }
            #preview-content .pay
            {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                align-items: center;
                grid-gap: 50px;
                position: relative;
                width: 1450px;
            }
            #preview-content .flex-pay {
                display: flex;
                flex-direction: column;
                position: relative;
                grid-gap: 35px;
            }
            #preview-content .box1,
            #preview-content .box2,
            #preview-content .box3,
            #preview-content .box4,
            #preview-content .box5,
            #preview-content .box6,
            #preview-content .box7
            {
                background: #14182b;
                box-shadow: 0px 0px 18px #21d0f3, 
                0px 0px 16px #219bf3, 
                inset -8px 8px 10px #3e5ec2, 
                inset 5px -6px 17px #125f73;
                border-radius: 20px;
                padding: 30px;
                width: 275px;
                height: 175px;
                cursor: pointer;
                transition: .4s cubic-bezier(0.6, 0.15, 0, 0.74);
            }
            #preview-content .box1:hover,
            #preview-content .box2:hover,
            #preview-content .box3:hover,
            #preview-content .box4:hover,
            #preview-content .box5:hover,
            #preview-content .box6:hover,
            #preview-content .box7:hover
            {
                transform: scale(1.2);
            }
            #preview-content .box2,
            #preview-content .box3,
            #preview-content .box4
            {
                background: #641e69;
                box-shadow: 0px 0px 18px #f321de, 
                0px 0px 16px #ca21f3, 
                inset 7px -8px 10px #c23eb0, 
                inset -5px 2px 17px #1b1273;
            }
            #preview-content .box5,
            #preview-content .box6,
            #preview-content .box7
            {
                background: #1f0a50;
                box-shadow: 0px 0px 5px #219cf3, 
                0px 0px 7px #219cf3, 
                inset 15px -10px 17px #653ec2, 
                inset -5px 2px 17px #124b73;
            }
            #preview-content .box1 p,
            #preview-content .box2 p,
            #preview-content .box3 p,
            #preview-content .box4 p,
            #preview-content .box5 p,
            #preview-content .box6 p,
            #preview-content .box7 p
            {
                color: white;
                font-size: 1.0rem;
                max-width: none;
                margin-bottom: 0px;
                margin-top: 30px;
            }



















            #preview-content .line-box1 {
                content: \'\';
                position: absolute;
                top: 50%;
                left: 28%;
                transform: translate(-50%, -50%);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                3px 4px 9px #f321de, 
                inset 0px -5px 12px #3e5ec2, 
                inset 0px 1px 15px #f321de;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow 7s ease-in-out forwards infinite;
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            #preview-content .line-box2 {
                content: \'\';
                position: absolute;
                top: 68%;
                left: 25%;
                transform: translate(-50%, -50%) rotate(36deg);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                3px 4px 9px #f321de, 
                inset 0px -5px 12px #3e5ec2, 
                inset 0px 1px 10px #f321de;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow 9.5s ease-in-out forwards infinite;
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            #preview-content .line-box3 {
                content: \'\';
                position: absolute;
                top: 26%;
                left: 28%;
                transform: translate(-50%, -50%) rotate(325deg);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                3px 4px 9px #f321de, 
                inset 0px -5px 12px #3e5ec2, 
                inset 0px 1px 10px #f321de;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow 11s ease-in-out forwards infinite;
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            @keyframes shadow
            {
                0%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    3px 4px 9px #f321de, 
                    inset 0px -5px 12px #3e5ec2, 
                    inset 0px 1px 15px #f321de;
                }
                25%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    3px 4px 9px #f321de, 
                    inset 0px -5px 12px #3e5ec2, 
                    inset 0px 1px 15px #f321de;
                }
                40%
                {
                    box-shadow: 7px -7px 20px #21d0f3, 
                    -6px 7px 9px #f321de,
                    inset 8px -11px 12px #3e5ec2, 
                    inset -6px 4px 10px #f321de;
                }
                60%
                {
                    box-shadow: -6px 7px 20px #21d0f3, 
                    5px 8px 9px #f321de, 
                    inset -8px 8px 12px #3e5ec2, 
                    inset 2px -3px 10px #f321de;
                }
                75%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    3px 4px 9px #f321de, 
                    inset 0px -5px 12px #3e5ec2, 
                    inset 0px 1px 15px #f321de;
                }

                100%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    3px 4px 9px #f321de, 
                    inset 0px -5px 12px #3e5ec2, 
                    inset 0px 1px 15px #f321de;
                }
            }


            #preview-content .line-box4 {
                content: \'\';
                position: absolute;
                top: 36%;
                left: 61%;
                transform: translate(-50%, -50%) rotate(325deg);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                6px 5px 15px #653ec2, 
                inset 0px -5px 8px #3e5ec2, 
                inset 8px 5px 16px #653ec2;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow2 9s ease-in-out forwards infinite;
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            #preview-content .line-box5 {
                content: \'\';
                position: absolute;
                top: 37%;
                left: 62%;
                transform: translate(-50%, -50%) rotate(35deg);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                6px 5px 15px #653ec2, 
                inset 0px -5px 8px #3e5ec2, 
                inset 8px 5px 16px #653ec2;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow2 9.5s ease-in-out forwards infinite;
                transition: .7s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            #preview-content .line-box6 {
                content: \'\';
                position: absolute;
                top: 14%;
                left: 58%;
                transform: translate(-50%, -50%);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                6px 5px 15px #653ec2, 
                inset 0px -5px 8px #3e5ec2, 
                inset 8px 5px 16px #653ec2;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow2 10s ease-in-out forwards infinite;
                transition: .7s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            #preview-content .line-box7 {
                content: \'\';
                position: absolute;
                top: 68%;
                left: 61%;
                transform: translate(-50%, -50%) rotate(333deg);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                6px 5px 15px #653ec2, 
                inset 0px -5px 8px #3e5ec2, 
                inset 8px 5px 16px #653ec2;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow2 10.5s ease-in-out forwards infinite;
                transition: .7s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            #preview-content .line-box8 {
                content: \'\';
                position: absolute;
                top: 85%;
                left: 62%;
                transform: translate(-50%, -50%);
                background: transparent;
                box-shadow: 0px 0px 20px #21d0f3, 
                6px 5px 15px #653ec2, 
                inset 0px -5px 8px #3e5ec2, 
                inset 8px 5px 16px #653ec2;
                width: 450px;
                height: 40px;
                z-index: -3;
                animation: shadow2 11s ease-in-out forwards infinite;
                transition: .7s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            }
            @keyframes shadow2
            {
                0%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    6px 5px 15px #653ec2, 
                    inset 0px -5px 8px #3e5ec2, 
                    inset 8px 5px 16px #653ec2;
                }
                25%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    6px 5px 15px #653ec2, 
                    inset 0px -5px 8px #3e5ec2, 
                    inset 8px 5px 16px #653ec2;
                }
                40%
                {
                    box-shadow: 7px -7px 20px #21d0f3, 
                    -6px 7px 15px #653ec2, 
                    inset 8px -11px 12px #3e5ec2, 
                    inset -8px 5px 10px #653ec2;
                }
                60%
                {
                    box-shadow: -6px 7px 20px #21d0f3, 
                    5px 8px 15px #653ec2, 
                    inset 8px 8px 12px #3e5ec2, 
                    inset 5px -6px 10px #653ec2;
                }
                75%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    6px 5px 15px #653ec2, 
                    inset 0px -5px 8px #3e5ec2, 
                    inset 8px 5px 16px #653ec2;
                }

                100%
                {
                    box-shadow: 0px 0px 20px #21d0f3, 
                    6px 5px 15px #653ec2, 
                    inset 0px -5px 8px #3e5ec2, 
                    inset 8px 5px 16px #653ec2;
                }
            }






            #preview-content .box-icon,
            #preview-content .box-icon2
            {
                width: 100%;
                height: 500px;
                position: relative;
            }
            #preview-content .box-click1,
            #preview-content .box-click2,
            #preview-content .box-click3,
            #preview-content .box-click4,
            #preview-content .box-click5,
            #preview-content .box-click6,
            #preview-content .box-click7
            {
                position: absolute;
                width: 100%; 
                height: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 10px;
                z-index: -3;
                transition: 1.1s cubic-bezier(0.6, -0.03, 0, 0.74) .5s;
                opacity: 0;
            }
            #preview-content .center-box
            {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items: center;
                width: 100%;

            }
            #preview-content .box-icon ion-icon
            {
                color: white;
                font-size: 13.0rem;
                padding: 50px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: shadow2 5s ease-in-out forwards infinite;
                border-radius: 50%;
                width: 200px;
            }
            #preview-content #color1
            {
                background: #14182b;
                box-shadow: 0px 0px 18px #21d0f3, 
                0px 0px 16px #219bf3, 
                inset -8px 8px 10px #3e5ec2, 
                inset 5px -6px 17px #125f73;
            }
            #preview-content #color2
            {
                background: #641e69;
                box-shadow: 0px 0px 18px #f321de, 
                0px 0px 16px #ca21f3, 
                inset 7px -8px 10px #c23eb0, 
                inset -5px 2px 17px #1b1273;
            }
            #preview-content #color3
            {
                background: #1f0a50;
                box-shadow: 0px 0px 5px #219cf3, 
                0px 0px 7px #219cf3, 
                inset 15px -10px 17px #653ec2, 
                inset -5px 2px 17px #124b73;
            }
            #preview-content .black-square2 {
                content: \'\';
                position: absolute;
                top: 50%;
                left: 265px;
                transform: translateY(-50%);
                background: transparent;
                box-shadow: 0px 0px 5px #21d0f3, 
                0px 0px 9px #219bf3, 
                inset -10px 3px 12px #3e5ec2, 
                inset 5px -6px 14px #125f73;
                width: 200px;
                height: 200px;
                transform: translateY(-50%) matrix3d(1, 0, 0, 0.01, 1, 1, 0, 0.007, 0, 0, 1, 0, 0, 8, 0, 1);
                z-index: -3;
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .4s;
            }
            #preview-content .flex-link
            {
                display: flex;
                grid-gap: 150px;
                opacity: 0;
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .4s;
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 3;
            }
            #preview-content .flex-link a 
            {
                padding: 7px 60px;
                text-decoration: none;
                color: white;
                position: relative;
                transition: .4s ease-in .2s;
                border-radius: 20px;
                background: transparent;
                box-shadow: 0px 0px 7px #219cf3, 0px 0px 10px #219cf3;
                font-size: 1.5rem;
            }



            /* JavaCSS-Animation */
            #preview-content .bg1
            {
                transform: scale(2.0) translate(37px); 
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg2
            {
                transform: scale(2) translate(260px, 105px);
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg3
            {
                transform: scale(2) translate(-210px);
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg4
            {
                transform: scale(2) translate(260px, -105px);
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg5
            {
                transform: scale(2) translate(-465px, 105px);
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg6
            {
                transform: scale(2.0) translate(0px);
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg7
            {
                transform: scale(2) translate(-460px, -105px);
                background: unset; 
                box-shadow: unset; 
                transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .2s;
            }
            #preview-content .bg1:hover
            {
                transform: scale(2.0) translate(37px); 
            }
            #preview-content .bg2:hover
            {
                transform: scale(2) translate(260px, 105px);
            }
            #preview-content .bg3:hover
            {
                transform: scale(2) translate(-210px);
            }
            #preview-content .bg4:hover
            {
                transform: scale(2) translate(260px, -105px);
            }
            #preview-content .bg5:hover
            {
                transform: scale(2) translate(-465px, 105px);
            }
            #preview-content .bg6:hover
            {
                transform: scale(2.0) translate(0px);
            }
            #preview-content .bg7:hover
            {
                transform: scale(2) translate(-460px, -105px);
            }

            #preview-content .bs
            {
                transform: translateY(-50%) matrix3d(1, 0, 0, 0.01, 1, 1, 0, -0.03, 0, 0, 1, 0, 0, 110, 0, 1); 
                left: 1010px;
            }





            #preview-content .contact,
        #preview-content .company,
        #preview-content .position1,
        #preview-content .position2
        {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            grid-gap: 50px;
        }
        #preview-content form
        {
            display: flex;
            flex-direction: column;
            grid-gap: 50px;
            margin: 0 auto;
            position: relative;
        }
        #preview-content .windows-bg,
        #preview-content .windows-bg2
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 65%;
            background: #0a0d1d;
            box-shadow: 0px 0px 5px #21d0f3, 0px 0px 9px #219bf3, inset -10px 3px 12px #3e5ec2, inset 5px -6px 14px #125f73;
            width: 140%;
            height: 120%;
            transform: translate(-50%, -50%) matrix3d(1, 0, 0, 0.001, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            z-index: -3;
            transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .4s;
            animation: shadow2 9.5s ease-in-out forwards infinite;
            border-radius: 5px;
        }
        #preview-content .windows-bg2
        {
            width: 500px;
            height: 350px;
            left: 50%;
        }
        #preview-content .windows-text
        {
            width: 650px;
            height: auto;
            position: relative;
            padding: 30px;
            animation: left1 15s linear forwards infinite;
        }
        @keyframes left1
        {
            0%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            29%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            30%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            99%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            100%
            {
                opacity: 1;
                transform: translateX(0px);
            }
        }
        #preview-content #left-side
        {
            animation: left2 15s linear forwards infinite;
        }
        #preview-content #left-side2
        {
            animation: left3 15s linear forwards infinite;
        }
        @keyframes left2
        {
            0%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            31%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            32%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            69%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            70%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            100%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
        }

        @keyframes left3
        {
            0%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            71%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            72%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            97.5%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            98.5%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
            100%
            {
                opacity: 0;
                transform: translateX(-30px);
            }
        }
        #preview-content .windows-text h1
        {
            margin-bottom: 40px;
        }
        #preview-content .box-icon2 ion-icon {
            color: white;
            font-size: 8.0rem;
            padding: 40px;
            box-shadow: 0px 0px 5px #21d0f3, 
            0px 0px 9px #219bf3, 
            inset -10px 3px 12px #3e5ec2, 
            inset 5px -6px 14px #125f73;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
        }
        #preview-content .box-arrow
        {
            width: 100%;
            height: 100%;
            position: relative;
            animation: right1 15s linear forwards infinite;
        }
        @keyframes right1
        {
            0%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            29%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            30%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            99%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            100%
            {
                opacity: 1;
                transform: translateX(0px);
            }
        }
        #preview-content #right-side
        {
            animation: right2 15s linear forwards infinite;
        }
        #preview-content #right-side2
        {
            animation: right3 15s linear forwards infinite;
        }
        @keyframes right2
        {
            0%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            31%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            32%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            69%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            70%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            100%
            {
                opacity: 0;
                transform: translateX(30px);
            }
        }

        @keyframes right3
        {
            0%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            71%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            72%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            97.5%
            {
                opacity: 1;
                transform: translateX(0px);
            }
            98.5%
            {
                opacity: 0;
                transform: translateX(30px);
            }
            100%
            {
                opacity: 0;
                transform: translateX(30px);
            }
        }
        #preview-content .circle-arrow
        {
            width: 400px;
            height: 300px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: roti 4s linear forwards infinite;
        }
        @keyframes roti
        {
            0%
            {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100%
            {
                transform: translate(-50%, -50%) rotate(-360deg);
            }
        }
        #preview-content .circle-arrow::before
        {
            content: \'\';
            position: absolute;
            top: 23%;
            left: 67%;
            transform: translate(-50%, -50%) rotate(90deg);
            width: 150px;
            height: 150px;
            z-index: -3;
            border-top: 2px solid #21d0f3;
            transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            border-top-left-radius: 500px;
        }
        #preview-content .circle-arrow::after
        {
            content: \'\';
            position: absolute;
            top: 75%;
            left: 32%;
            transform: translate(-50%, -50%) rotate(90deg);
            width: 150px;
            height: 150px;
            z-index: -3;
            border-bottom: 2px solid #21d0f3;
            transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            border-bottom-right-radius: 500px;
        }
        #preview-content .windows-bg::before,
        #preview-content .windows-bg2::before
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 45%;
            transform: translate(-50%, -50%) rotate(90deg);
            width: 161%;
            height: 3px;
            z-index: -3;
            animation: shadow2 9s ease-in-out forwards infinite;
            transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
        }
        #preview-content .windows-bg::after,
        #preview-content .windows-bg2::after
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
            width: 100%;
            height: 3px;
            z-index: -3;
            animation: shadow2 9s ease-in-out forwards infinite;
            transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
        }
        #preview-content .windows-bg2::before
        {
            width: 70%;
        }
        #preview-content form::before
        {
            content: \'\';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) matrix3d(1, 0, 0, 0.01, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            width: 62%;
            height: 8px;
            z-index: -3;
            animation: shadow2 9s ease-in-out forwards infinite;
            transition: .9s cubic-bezier(0.6, -0.03, 0, 0.74) .05s;
            filter: blur(8px);
        }
        #preview-content input,
        #preview-content textarea,
        #preview-content button
        {
            width: 300px;
            padding: 15px;
            box-shadow: 0px 0px 5px #21d0f3, 
            0px 0px 9px #219bf3, 
            inset -10px 3px 12px #3e5ec2, 
            inset 5px -6px 14px #125f73;
            background: #0a0d1d;
            border-radius: 30px;
            border:  2px solid #21d0f3;
            color: white;
        }
        #preview-content textarea
        {
            height: 250px;
            border-radius: 20px;
        }
        #preview-content button
        {
            font-size: 1.3rem;
        }
        #preview-content .position1,
        #preview-content .position2
        {
            position: absolute;
            width: 80%;
        }
        #preview-content .comment
        {
            padding: 250px 10% 170px 10%;
            position: relative;

        }



        /*     footer-page     */
        #preview-content .bg-footer
        {
            position: relative;
        }
        #preview-content .active
        {
            transition: .9s cubic-bezier(0.075, 0.82, 0.165, 1) .2s;
        }
        #preview-content .light
        {
            transform: translate(-50%, -50%) matrix3d(1, 0, 0, 0.005, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) rotate(29deg);
            opacity: 0;
        }

        #preview-content .text-on-mobile
        {
            position: absolute;
            top: 32%;
            left: 58%;
            width: 620px;
            z-index: 3;
        }
        #preview-content .skew-text
        {
            transform: scale(0.25) skew(322deg, 26deg);
        }
        #preview-content .text-on-mobile::before {
            content: \'\';
            position: absolute;
            top: 55%;
            left: 46%;
            transform: translate(-50%, -50%) skew(322deg, 26deg);
            width: 200px;
            height: 300px;
            background: #14182b;
            box-shadow: 0px 0px 18px #21d0f3, 
            0px 0px 16px #219bf3, 
            inset -8px 8px 10px #3e5ec2, 
            inset 5px -6px 17px #125f73;
            z-index: -2;
            border-radius: 20px;
            animation: shadow2 9s ease-in-out forwards infinite;
        }
        #preview-content .circle-rotate
        {
            position: absolute;
            top: 56%;
            left: 47%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 300px;
        }
        #preview-content .circle-rotate::before {
            content: \'\';
            position: absolute;
            top: -50%;
            left: -40%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: #14182b;
            box-shadow: 0px 0px 12px #21d0f3, 
            0px 0px 10px #219bf3, 
            inset -8px 8px 10px #3e5ec2, 
            inset 5px -6px 17px #125f73;
            z-index: -2;
            border-radius: 50%;
            animation: ball 8s cubic-bezier(0.87, 0.14, 0, 0.74) forwards infinite;
        }
        #preview-content .circle-rotate::after {
            content: \'\';
            position: absolute;
            top: 10%;
            left: -90%;
            transform: translate(-50%, -50%);
            width: 70px;
            height: 70px;
            background: #14182b;
            box-shadow: 0px 0px 12px #21d0f3, 
            0px 0px 10px #219bf3, 
            inset -8px 8px 10px #3e5ec2, 
            inset 5px -6px 17px #125f73;
            z-index: -2;
            border-radius: 50%;
            animation: ball 6s cubic-bezier(0.87, 0.14, 0, 0.74) forwards infinite;
        }
        @keyframes ball
        {
            0%
            {
                transform: translate(-50%, -50%);
                opacity: 0;
            }
            25%
            {
                transform: translate(-250%, -250%) matrix3d(1, 0, 0, 0.016, 0, 1, 0, 0.03, 0, 0, 1, 0, 0, 0, 0, 2);
                opacity: 1;
            }
            50%
            {
                transform: translate(250%, 250%) matrix3d(1, 0, 0, 0.016, 0, 1, 0, 0.03, 0, 0, 1, 0, 0, 0, 0, 2);
                opacity: 1;
            }
            55%
            {
                transform: translate(250%, 250%) matrix3d(1, 0, 0, 0.016, 0, 1, 0, 0.03, 0, 0, 1, 0, 0, 0, 0, 2);
                opacity: 0;
            }
            100%
            {
                transform: translate(-50%, -50%);
                opacity: 0;
            }
        }
        #preview-content .flex-footer
        {
            display: flex;
            margin-top: 150px;
        }
        #preview-content .col
        {
            display: flex;
            flex-direction: column;
            margin: 0px 150px 0px 0px;
        }
        #preview-content .col a
        {
            color: #ebe6f1c0;
            margin-bottom: 10px;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 400;
            transition: .4s;
            position: relative;
        }
        #preview-content .col a:hover
        {
            color: ghostwhite;
            transform: scale(1.2);
        }

        #preview-content .last
        {
            padding: 0px 10%;
        }
        #preview-content .copyright
        {
            position: relative;
        }
        #preview-content .copyright::before
        {
            content: \'\';
            position: absolute;
            top: -50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 2px;
            box-shadow: 0px 0px 18px #21d0f3, 
            0px 0px 16px #219bf3, 
            inset -8px 8px 10px #3e5ec2, 
            inset 5px -6px 17px #125f73;
            border-radius: 50%;
            z-index: -1;
        }
        ';


        // Create the second custom template record.
        UserTemplate::create([
            'user_id'       => $user->id,
            'project_name'  => 'Project 3',
            'html_content'  => $htmlContent3,
            'css_content'   => $combinedCss3,
            'hover_css'     => '',
            'keyframe_css'  => '',
            'media_queries' => '',
            'select_unit'   => '',
            'background_data' => '',
            'box_shadows'   => '',
            'text_shadows'  => '',
            'is_custom'     => true,
        ]);



    }
}