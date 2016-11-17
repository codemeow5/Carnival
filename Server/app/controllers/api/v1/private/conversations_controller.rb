module Api
    module V1
        module Private
            class ConversationsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def recent
                    requires! :channel_id, type: String
                    requires! :user_client_id, type: String

                    @instances = Conversation.order(latest_active: :desc).limit(3).where(
                        channel_id: params[:channel_id], 
                        user_client_id: params[:user_client_id])
                    render json: @instances, each_serializer: ConversationWithMessagesSerializer
                end
            end
        end
    end
end