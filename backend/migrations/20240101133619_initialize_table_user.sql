-- +goose Up
-- +goose StatementBegin
CREATE DATABASE firstcallqa
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP DATABASE IF EXISTS firstcallqa;
-- +goose StatementEnd
