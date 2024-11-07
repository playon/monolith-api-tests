// Definition: Coverage metadata.
// Following DRY principle, this file contains all the metadata for the coverage.
// This data has to be populated to each test case for the coverage.
export enum URI {}

export enum STATUS {
  CREATED = 201,
  OK = 200,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  CONFLICT = 409,
}

export enum METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
