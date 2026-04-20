import path from 'path';
import fs from 'fs' ;
import transporter from '../configs/nodemailer.config';
import Handlebars from 'handlebars';


export const mailService = {
    async sendMail (
        templateName : string,
        handlebarsData : any, 
        email : string,
        subject : string

    ){
      const templateDir = path.resolve(__dirname, '../templates');
              const templatePath = path.join (templateDir, templateName)
              const templateSource = fs.readFileSync(templatePath, 'utf-8')
      
              const compiledTemplates = Handlebars.compile(templateSource)
              const template = compiledTemplates(handlebarsData)
      
      
              await transporter.sendMail({
                  from: "zaidsyaifulfatih98@gmail.com",
                  to: email,
                  subject : subject,
                  html: template
              })
        
    }
}