module Api
    module V1
        module Private
            class AdminsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def profile
                    render json: current_user
                end

                def update
                    optional! :first_name, type: String
                    optional! :last_name, type: String
                    optional! :phone_number, type: String
                    optional! :company_name, type: String
                    optional! :occupation, type: String
                    optional! :about, type: String
                    optional! :website_url, type: String

                    @instance = current_user
                    @instance.first_name = !params[:first_name].nil? ? params[:first_name] : @instance.first_name
                    @instance.last_name = !params[:last_name].nil? ? params[:last_name] : @instance.last_name
                    @instance.phone_number = !params[:phone_number].nil? ? params[:phone_number] : @instance.phone_number
                    @instance.company_name = !params[:company_name].nil? ? params[:company_name] : @instance.company_name
                    @instance.occupation = !params[:occupation].nil? ? params[:occupation] : @instance.occupation
                    @instance.about = !params[:about].nil? ? params[:about] : @instance.about
                    @instance.website_url = !params[:website_url].nil? ? params[:website_url] : @instance.website_url
                    @instance.save!

                    render json: @instance
                end

                def password
                    optional! :password, type: String
                    optional! :newpassword, type: String

                    @instance = current_user
                    if @instance.valid_password?(params[:password])
                        @instance.password = params[:newpassword]
                        @instance.password_confirmation = params[:newpassword]
                        @instance.save!

                        # http://www.unknownerror.org/opensource/plataformatec/devise/q/stackoverflow/4264750/devise-logging-out-automatically-after-password-change
                        sign_out(current_user)
                        sign_in(@instance, bypass: true)
                        
                        render json: @instance
                    else
                        render json: { error: 'Invalid password.' }
                    end
                end
            end
        end
    end
end