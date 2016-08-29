Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  class TenantdomainConstraint
    def self.matches?(request)
      subdomains = %w( www )
      request.subdomains[0].present? && !subdomains.include?(request.subdomains[0])
    end
  end

  class MaindomainConstraint
    def self.matches?(request)
      subdomains = %w( www )
      !request.subdomain.present? || subdomains.include?(request.subdomain)
    end
  end

  # constraints MaindomainConstraint do
    devise_for :admins, controllers: { 
      registrations: "admins/registrations",
      sessions: "admins/sessions" 
    }
  # end

  authenticate :admin do
    get 'dashboard', to: "home#dashboard", as: :dashboard
  end

  authenticated :admin do
    root 'home#dashboard', as: :authenticated_root
  end

  unauthenticated :admin do
    devise_scope :admin do
      root 'admins/sessions#new', as: :unauthenticated_root
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show, :update, :destroy], constraints: TenantdomainConstraint
      resources :tags, only: [:index, :create, :show, :destroy], constraints: TenantdomainConstraint
    end
  end
end
