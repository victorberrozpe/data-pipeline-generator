function generateCode() {
    const technology = document.getElementById('technology').value;
    let code = '';

    switch (technology) {
        case 'aws':
            code = `
            provider "aws" {
              region = "us-west-2"
            }

            resource "aws_s3_bucket" "b" {
              bucket = "my-tf-test-bucket"
              acl    = "private"
            }
            `;
            break;
        case 'gcp':
            code = `
            provider "google" {
              project = "my-project-id"
              region  = "us-central1"
            }

            resource "google_storage_bucket" "b" {
              name     = "my-tf-test-bucket"
              location = "US"
            }
            `;
            break;
        case 'azure':
            code = `
            provider "azurerm" {
              features {}
            }

            resource "azurerm_resource_group" "example" {
              name     = "example-resources"
              location = "West Europe"
            }

            resource "azurerm_storage_account" "example" {
              name                     = "examplestoracc"
              resource_group_name      = azurerm_resource_group.example.name
              location                 = azurerm_resource_group.example.location
              account_tier             = "Standard"
              account_replication_type = "LRS"
            }
            `;
            break;
    }

    document.getElementById('generated-code').innerText = code;
}
